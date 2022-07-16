var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
router.get('/', async(req, res, next) => {
  const allBooks = await Book.findAll()
  console.log(allBooks);
  res.json(allBooks)

});

module.exports = router;
