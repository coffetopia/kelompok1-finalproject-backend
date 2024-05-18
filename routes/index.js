const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { register, login } = require('../controllers/authenticationController');
const { showProfile } = require('../controllers/userController');
const { getProducts } = require('../controllers/productController');

router.get('/', (req, res) => {
  res.send('Home');
});

router.post('/register', register);
router.post('/login', login);

router.get('/profile', auth, showProfile);

router.get('/dashboard', auth, (req, res) => {
  res.sendStatus(200);
});

router.get('/products', getProducts);

module.exports = router;