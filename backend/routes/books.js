const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { searchBooks } = require('../controllers/booksController');
const { searchWithFilters } = require('../controllers/booksController');


router.get('/', booksController.getAllBooks);
router.get('/search', searchBooks);
router.get('/search-with-filters', searchWithFilters);

router.post('/', booksController.addBook);

module.exports = router;
