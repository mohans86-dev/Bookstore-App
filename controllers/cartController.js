const Cart = require("../models/Cart");
const Book = require("../models/Book");

exports.addToCart = async (req, res) => {
  try {
    const { bookId } = req.body;

    // 🔍 Fetch the book from DB
    const book = await Book.findById(bookId);

    // ❌ Book doesn't exist
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // ❌ Book is out of stock or unavailable
    if (book.quantity === 0 || book.isAvailable === false) {
      return res.status(400).json({ error: "Book is out of stock" });
    }

    // ✅ Proceed to add to cart
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const index = cart.items.findIndex((i) => i.book.toString() === bookId);
    if (index >= 0) {
      // Optional: Check if adding one more exceeds available stock
      if (cart.items[index].quantity >= book.quantity) {
        return res.status(400).json({ error: "Not enough stock available" });
      }
      cart.items[index].quantity++;
    } else {
      cart.items.push({ book: bookId, quantity: 1 });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(500).json({ error: "Failed to add book to cart" });
  }
};

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.book"
  );
  res.json(cart);
};

exports.removeItem = async (req, res) => {
  const { bookId } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });
  cart.items = cart.items.filter((i) => i.book.toString() !== bookId);
  await cart.save();
  res.json(cart);
};

// GET /api/cart/summary
exports.getSummary = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.book"
  );

  if (!cart || cart.items.length === 0) {
    return res
      .status(400)
      .json({ msg: "Cart is empty", total: 0, shipping: 0 });
  }

  let total = 0;
  let itemCount = 0;

  cart.items.forEach(({ book, quantity }) => {
    total += book.retailPrice * quantity;
    itemCount += quantity;
  });

  const shipping = itemCount === 0 ? 0 : 3 + (itemCount - 1);

  res.json({
    msg: `${itemCount} items in cart`,
    total,
    shipping,
  });
};

// POST /api/cart/checkout
exports.checkout = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.book"
  );
  let total = 0;
  let updated = [];
  let itemCount = 0;

  cart.items.forEach(({ book, quantity }) => {
    if (book.quantity >= quantity) {
      book.quantity -= quantity;
      book.isAvailable = book.quantity > 0; // update availability
      total += book.retailPrice * quantity;
      itemCount += quantity;
      updated.push(book.save());
    }
  });

  await Promise.all(updated);
  cart.items = [];
  await cart.save();

  const shipping = itemCount === 0 ? 0 : 3 + (itemCount - 1);
  res.json({ msg: "Order complete", total, shipping });
};
