const express = require('express');
const router = express.Router();
const readersController = require('../controllers/readersController');

router.get('/', readersController.getAllReaders);
router.post('/', readersController.addReader); 

module.exports = router;
