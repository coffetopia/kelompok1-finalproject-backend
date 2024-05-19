const { Category, Product } = require('../models');
const response = require("../services/response");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    response(200, true, categories, 'Success get categories', res);
  } catch (error) {
    console.error(error);
    response(400, false, error, 'Failed to get categories', res);
  }
}

const getCategoryProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findAll({
      where: {
        category_id: id,
      },
      include: {
        model: Category,
        as: 'category',
      },
      attributes: {
        exclude: ['category_id'],
      },
    });
    response(200, true, products, 'Success get product by category', res);
  } catch (error) {
    console.error(error);
    response(400, false, error, 'Failed to get the product', res);
  }
}

const createCategory = async (req, res) => {
  try {
    const category = {
      ...req.body,
    };
    const create = await Category.create(category);
    console.log(create);
    response(201, true, create, 'Success add new category', res);
  } catch (error) {
    console.error(error);
    response(400, false, error, 'Failed to add new category', res);
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const edit = {
      ...req.body,
    };
    const category = await Category.findByPk(id);
    if(!category) {
      return response(400, false, '', 'Failed to edit category, id category not found', res);
    }
    const editedCategory = await category.update(edit);
    response(201, true, editedCategory, 'Success edited category', res);
  } catch (error) {
    console.error(error);
    response(400, false, error, 'Failed to edit category', res);
  }
}

module.exports = {
  getCategories,
  getCategoryProduct,
  createCategory,
  updateCategory,
};