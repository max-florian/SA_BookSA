const router = require('express').Router();
const { getBitacoraBooks } = require('../controllers')

router.get('/books', getBitacoraBooks)

module.exports = router;