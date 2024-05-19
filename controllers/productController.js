const { Product, Category } = require("../models");
const response = require("../services/response");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
      },
      attributes: {
        exclude: ['category_id'],
      },
    });
    response(200, true, products, 'Success get all products', res);
  } catch (error) {
    console.error(error);
    response(400, false, error, 'Failed to get products', res);
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: {
        model: Category,
        as: 'category',
      },
      attributes: {
        exclude: ['category_id'],
      },
    });
    response(200, true, product, 'Success get product by id', res);
  } catch (error) {
    console.error(error);
    response(400, false, error, 'Failed to get the product', res)
  }
}

const createProduct = async (req, res) => {
  try {
    const product = {
      ...req.body,
    }
    const newProduct = await Product.create(product);
    response(201, true, newProduct, 'Succes to add new product', res);
  } catch (error) {
    console.error(error);
    response(400, false, error, 'Failed to add product', res);
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const edit = {
      ...req.body
    }
    const product = await Product.findByPk(id);
    if (!product) {
      return response(400, false, '', 'Failed to edit product, id product not found', res);
    }
    const editedProduct = await product.update(edit);
    response(201, true, editedProduct, 'Success edited product', res);
  } catch (error) {
    console.error(error);
    response(400, false, error, 'Failed to edit product', res);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
};