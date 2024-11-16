const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController');



router.get('/:loanId', loansController.getLoanById);
router.post('/', loansController.addLoan); 
router.get('/', loansController.getAllLoans);
router.put('/:loanId', loansController.updateLoan);


module.exports = router;