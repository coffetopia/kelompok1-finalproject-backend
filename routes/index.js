const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { register, login, logout, refreshToken } = require('../controllers/authenticationController');
const { showProfile } = require('../controllers/userController');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} = require('../controllers/productController');
const {
  getCategories,
  createCategory,
  getCategoryProduct,
  updateCategory,
 } = require('../controllers/categoryController');

router.get('/', (req, res) => {
  res.send('Home');
});

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', auth, logout);
router.get('/token', refreshToken);

router.get('/profile', auth, showProfile);

router.get('/dashboard', auth, (req, res) => {
  res.sendStatus(200);
});

router.get('/products', getProducts);
router.post('/product', createProduct);
router.put('/products/:id', updateProduct);
router.get('/products/:id', getProductById);

router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryProduct);
router.post('/category', createCategory);
router.put('/categories/:id', updateCategory);

module.exports = router;