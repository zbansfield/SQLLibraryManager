var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
router.get('/', async(req, res, next) => {
  res.redirect('books')
  /*
  // Testing Book model and communication with database
  const allBooks = await Book.findAll()
  console.log(allBooks);
  res.json(allBooks)
  */
});

// Set up routes

/* GET books page */
router.get('/books', async(req, res) => {
  const allBooks = await Book.findAll()
  res.render('layout', { allBooks, title: "Books" })
});

/* GET create new book form */
router.get('/books/new', async(req, res) => {
  res.render('new-book', { book: {}, title: "New Book" })
});

/* POST new book to database */
router.post('/books/new', async(req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect(`/books/${book.id}`)
  } catch(error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("new-book", { book, errors: error.errors, title: 'New Book' })
    } else {
      throw error;
    }
  }

});

/* GET update book form */
router.get('/books/:id', async(req, res) => {
  const book = await Book.findByPk(req.params.id)
  console.log(book)
  if (book !== null) {
    res.render('update-book', { book, title: `${book.title}` })
  } else {
    const error = {
      message: 'Page not found',
      status: 404
    };
    res.render('page-not-found', {error, title: "Page Not Found"});
  }
});

/* Updates book in database */
router.post('/books/:id', async(req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect('/books')
  } catch(error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id; 
      res.render("update-book", { book, errors: error.errors, title: `${book.title}` })
    } else {
      throw error;
    }
  }

});

/* Deletes book from database */
router.post('/books/:id/delete', async(req, res) => {
  let book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books')
});

module.exports = router;