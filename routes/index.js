var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
router.get('/', async(req, res, next) => {
  res.redirect('books')
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

/* GET update book form */
router.get('/books/:id', async(req, res, next) => {
  const book = await Book.findByPk(req.params.id)
  res.render('update-book', { book })
});

/* POST updates book in database */
router.post('/books/:id', async(req, res, next) => {
  let book;
  book = await Book.findByPk(req.params.id);
  let updates = req.body;
  updates.id = req.params.id
  console.log(req.body)
  await book.update(updates);
  // res.redirect("/books/" + book.id); 
  // if(book) {
  //   await Book.update(req.body);
  //   console.log(book)
  //   res.redirect("/books/" + book.id); 
  // } else {
  //   res.sendStatus(404);
  // }
  res.redirect('books')
});

/* POST deletes book from database */
router.post('/books/:id/delete', async(req, res, next) => {
  res.redirect('books')
});

module.exports = router;