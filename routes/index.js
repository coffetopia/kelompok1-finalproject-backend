const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const { register, login } = require('../controllers/userController');

router.get('/', (req, res) => {
  res.send('Home');
});

router.post('/register', register);
router.post('/login', login);

router.get('/dashboard', verifyToken, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;