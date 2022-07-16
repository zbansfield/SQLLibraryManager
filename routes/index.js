var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
router.get('/', async(req, res, next) => {
  res.redirect('/books')
  // const allBooks = await Book.findAll()
  // console.log(allBooks);
  // res.json(allBooks)
});

// Set up routes

/* GET books page */
router.get('/books', async(req, res, next) => {
  const allBooks = await Book.findAll()
  res.render('layout', {allBooks})
});

/* GET create new book form */
router.get('/books/new', async(req, res, next) => {
  res.render('new-book')
});

/* POST new book to database */
router.post('/books/new', async(req, res, next) => {
  res.redirect('books')
});

module.exports = router;
