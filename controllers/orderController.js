const { Order, ProductList, Product, User } = require("../models");
const response = require("../services/response");

exports.createOrder = async (req, res) => {
  try {
    const { user_Id, products, totalAmount, paymentMethod, orderStatus } = req.body;

    // Buat pesanan baru
    const order = await Order.create({ user_Id, totalAmount, paymentMethod, orderStatus });

    // Buat daftar produk
    const productListPromises = products.map(async (product) => {
      const productItem = {
        order_Id: order.id,
        product_Id: product.product_Id,
        quantity: product.quantity
      };
      return await ProductList.create(productItem);
    });

    await Promise.all(productListPromises);

    response(201, true, order, 'Order created successfully', res);
  } catch (error) {
    console.error(error);
    response(500, false, error, 'Failed to create order', res);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: 'user'
        },
        {
          model: ProductList,
          as: 'productList',
          include: {
            model: Product,
            as: 'product'
          }
        }
      ]
    });
    response(200, true, orders, 'Success fetch all orders', res);
  } catch (error) {
    console.error(error);
    response(500, false, error, 'Failed to fetch orders', res);
  }
};

module.exports = {
  createOrder,
  getOrders
};
