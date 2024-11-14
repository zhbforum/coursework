const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController');


router.get('/:loanId', loansController.getLoanById);
router.post('/', loansController.addLoan); 
router.put('/:loanId', loansController.updateLoan);
router.get('/', loansController.getAllLoans);

module.exports = router;
