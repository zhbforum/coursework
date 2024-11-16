const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

router.get('/', paymentsController.getAllPayments);
router.get('/:paymentId', paymentsController.getPaymentById);
router.post('/', paymentsController.addPayment);
router.put('/:paymentId', paymentsController.updatePayment);

router.delete('/:paymentId', paymentsController.deletePayment);

module.exports = router;
