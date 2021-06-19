const router = require('express').Router();
const {approve, getUsers, deleteUser} = require('../controllers');

router.post('/aprobar', approve);

router.get('/users', getUsers);
router.delete('/user/:id_user', deleteUser);

module.exports = router;