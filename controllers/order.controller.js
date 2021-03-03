const utilsHelper = require("../helpers/utils.helper");
const Order = require("../models/Order");
const Product = require("../models/Product");

//order controllers
const orderController = {};

//Create the order
orderController.createOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { products } = req.body;
    let total = 0;
    const promises = products.map(async (_id) => {
      let product = await Product.findById(_id);
      if (!product) return Promise.reject(_id);
      total += product.price;
    });

    await Promise.all(promises).catch((notFoundId) => {
      return next(new Error(`403- Product Not Found ${notFoundId}`));
    });

    // create Order that represent
    const order = await Order.create({
      userId,
      products,
      total,
    });
    //
    utilsHelper.sendResponse(res, 200, true, { order }, null, "Order created");
  } catch (error) {
    next(error);
  }
};

//Get detail of an order by its ID
orderController.getDetailOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) return next(new Error("401- Order not found"));
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "get detail order success"
    );
  } catch (error) {
    next(error);
  }
};
//Update Order
orderController.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { products } = req.body;

    let total = 0;
    const promises = products.map(async (_id) => {
      let product = await Product.findById(_id);
      if (!product) return Promise.reject(_id);
      total += product.price;
    });

    await Promise.all(promises).catch((notFoundId) => {
      return next(new Error(`403- Product Not Found ${notFoundId}`));
    });
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
        status: "pending",
      },
      { products, total },
      { new: true }
    );
    if (!order) {
      return next(new Error("pending  order not found or User not authorized"));
    }
    utilsHelper.sendResponse(res, 200, true, { order }, null, "order send");
  } catch (error) {
    next(error);
  }
};
//

//delete order
orderController.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      { isDeleted: true },
      { new: true }
    );
    if (!order) {
      return next(new Error("order not found or User not authorized"));
    }
  } catch (error) {
    next(error);
  }
};
module.exports = orderController;
