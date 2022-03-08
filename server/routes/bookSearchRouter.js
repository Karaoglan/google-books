const bookSearchController = require('../controllers/bookSearchController');

const router = require('express').Router();

router.post('/', bookSearchController.bookSearch);

module.exports = router;
