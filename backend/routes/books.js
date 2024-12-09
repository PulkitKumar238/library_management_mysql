const express = require("express");
const db = require("../models/db");
const router = express.Router();

router.post("/add", (req, res) => {
  const { title, author, genre, isbn, publication_date, available_copies } =
    req.body;
  const sql = "INSERT INTO books SET ?";
  const newBook = {
    title,
    author,
    genre,
    isbn,
    publication_date,
    available_copies,
  };
  db.query(sql, newBook, (err, result) => {
    if (err) throw err;
    res.send("Book added successfully!");
  });
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM books";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM books WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send("Book deleted successfully!");
  });
});

router.put("/update/:id", (req, res) => {
  const { available_copies } = req.body;
  const sql = "UPDATE books SET available_copies = ? WHERE id = ?";
  db.query(sql, [available_copies, req.params.id], (err, result) => {
    if (err) throw err;
    res.send("Book updated successfully!");
  });
});

module.exports = router;
