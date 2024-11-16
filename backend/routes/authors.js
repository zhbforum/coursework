const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');

router.get('/', authorsController.getAllAuthors);
router.get('/:authorId', authorsController.getAuthorById);
router.post('/', authorsController.addAuthor);
router.put('/:authorId', authorsController.updateAuthor);

router.delete('/:authorId', authorsController.deleteAuthor);

module.exports = router;
