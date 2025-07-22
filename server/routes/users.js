const router = require('express').Router();
const { getUsers, deleteUser } = require('../controllers/userController.js');
const { adminAuth } = require('../middleware/auth.js');


router.get('/', adminAuth, getUsers);
router.delete('/:id', adminAuth, deleteUser);

module.exports = router;