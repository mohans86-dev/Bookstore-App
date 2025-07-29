const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addToCart,
  getCart,
  removeItem,
  getSummary,
  checkout,
} = require("../controllers/cartController");

router.post("/add", auth, addToCart);
router.get("/", auth, getCart);
router.post("/remove", auth, removeItem);
router.get("/summary", auth, getSummary); // New
router.post("/checkout", auth, checkout); // Final step

module.exports = router;
