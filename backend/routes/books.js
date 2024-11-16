const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { searchBooks } = require('../controllers/booksController');
const { searchWithFilters } = require('../controllers/booksController');

router.get('/search-with-filters', searchWithFilters);
router.get('/search', searchBooks);
router.get('/:bookId', booksController.getBookById);

router.get('/', booksController.getAllBooks);
router.put('/:bookId', booksController.updateBook);
router.post('/', booksController.addBook);

router.delete('/:bookId', booksController.deleteBook);

module.exports = router;
