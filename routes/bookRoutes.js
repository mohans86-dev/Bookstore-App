const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addOrUpdateBook,
  updateBook,
  getAllBooks,
  getAvailableBooks,
  deleteBook,
} = require("../controllers/bookController");

router.post("/add", auth, addOrUpdateBook);
router.post("/update/:isbn", auth, updateBook);
router.get("/", getAllBooks);
router.get("/available", getAvailableBooks);
router.delete("/delete/:isbn", auth, deleteBook);

module.exports = router;
