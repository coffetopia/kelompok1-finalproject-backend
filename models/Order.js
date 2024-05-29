'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'user_Id',
        as: 'user',
      });
      // Order.hasMany(models.ProductList, {
      //   foreignKey: 'order_Id',
      //   as: 'productList',
      // });
    }
  }

  Order.init({
    user_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Name of the target model
        key: 'id', // Key in the target model that we're referencing
      },
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Order',
    timestamps: false,
  });

  return Order;
};
