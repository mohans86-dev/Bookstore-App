const Book = require("../models/Book");

// exports.addOrUpdateBook = async (req, res) => {
//   try {
//     const {
//       title,
//       author,
//       publishedDate,
//       isbn,
//       description,
//       coverImage,
//       tradePrice,
//       retailPrice,
//       quantity,
//       isAvailable = true, // default to true if not provided
//     } = req.body;

//     let coverUrl = req.body.coverImage;
//     console.log("Cover URL provided:", coverUrl);
//     if (!coverUrl) {
//       // fetching cover image using title from OpenLibrary
//       const response = await fetch(
//         `https://covers.openlibrary.org/b/title/${encodeURIComponent(
//           title
//         )}-L.jpg`
//       );

//       if (response.ok) {
//         console.log("Cover fetched successfully from OpenLibrary");
//         coverUrl = response.url;
//       } else {
//         console.warn("Cover fetch failed, using default image");
//       }
//     } else {
//       console.log("Using uploaded cover image from Android internal storage");
//     }

//     const newBook = new Book({
//       title,
//       author,
//       publishedDate,
//       isbn,
//       description,
//       coverImage: coverUrl,
//       tradePrice,
//       retailPrice,
//       quantity,
//       isAvailable: quantity > 0, // set availability based on quantity
//     });

//     await newBook.save();
//     res.status(201).json({ msg: "Book added", book: newBook });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "Failed to add or update book" });
//   }
// };

exports.addOrUpdateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      publishedDate,
      isbn,
      description,
      coverImage, // Base64 image string
      tradePrice,
      retailPrice,
      quantity,
      isAvailable = true,
    } = req.body;

    let base64Image = req.body.coverImage;

    if (!base64Image) {
      console.warn(
        "No image provided, fallback to OpenLibrary image (optional)"
      );
      // Optional fallback logic here (you can skip this entirely)
      const response = await fetch(
        `https://covers.openlibrary.org/b/title/${encodeURIComponent(
          title
        )}-L.jpg`
      );
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const base64Buffer = Buffer.from(buffer).toString("base64");
        base64Image = `data:image/jpeg;base64,${base64Buffer}`;
      }
    }

    const newBook = new Book({
      title,
      author,
      publishedDate,
      isbn,
      description,
      coverImage: base64Image, // store base64 directly
      tradePrice,
      retailPrice,
      quantity,
      isAvailable: quantity > 0,
    });

    await newBook.save();
    res.status(201).json({ msg: "Book added", book: newBook });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to add or update book" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { isbn } = req.params;

    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    } else {
      book.quantity += 1;
      book.isAvailable = book.quantity > 0; // update availability based on new quantity
      await book.save();
      return res.json({ msg: "Stock updated", book });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update book" });
  }
};

exports.getAvailableBooks = async (req, res) => {
  try {
    const books = await Book.find({ isAvailable: true });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch available books" });
  }
};

exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.deleteBook = async (req, res) => {
  try {
    const { isbn } = req.params;

    const deletedBook = await Book.findOneAndDelete({ isbn });

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ msg: "Book deleted", book: deletedBook });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Failed to delete book", details: err.message });
  }
};
