const router = require('express').Router();
const {approve, getUsers} = require('../controllers');

router.post('/aprobar', approve);
router.get('/users', getUsers);

module.exports = router;