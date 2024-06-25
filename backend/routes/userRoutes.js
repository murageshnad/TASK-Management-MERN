const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { registerUser, authUser, deleteUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', authUser);
router.delete('/', auth, deleteUser);

module.exports = router;
