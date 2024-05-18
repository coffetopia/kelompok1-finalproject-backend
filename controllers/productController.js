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
      }
    });
    response(200, true, products, 'Success get products', res);
  } catch (error) {
    console.error(error);
    response(400, false, error, 'Failed to get products', res);
  }
}

module.exports = { getProducts }