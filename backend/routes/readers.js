const express = require('express');
const router = express.Router();
const readersController = require('../controllers/readersController');

router.get('/:readerId', readersController.getReaderById);
router.get('/', readersController.getAllReaders);
router.post('/', readersController.addReader); 
router.put('/:readerId', readersController.updateReader);

module.exports = router;
