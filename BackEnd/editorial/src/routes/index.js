const router = require('express').Router();
const {approve} = require('../controllers');

router.post('/aprobar', approve);

module.exports = router;