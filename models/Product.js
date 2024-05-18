'use strict';

const {
  Model
} = require('sequelize');
// const Category = require('./category');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: false,
  });

  return Product;
};