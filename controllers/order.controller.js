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

    let results = [];
    const promises = products.map(async (_id) => {
      let product = await Product.findById(_id);
      if (!product) return Promise.reject(_id);
      results.push(product);
      total += product.price;
    });

    await Promise.all(promises).catch((notFoundId) => {
      return next(new Error(`403- Product Not Found ${notFoundId}`));
    });

    // create Order that represent
    const order = await Order.create({
      userId,
      products: results,
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
orderController.getAllOrder = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalOrders = await Order.count({ ...filter, isDeleted: false });

    const totalPages = Math.ceil(totalOrders / limit);
    const offset = limit * (page - 1);

    const orders = await Order.find({ ...filter, isDeleted: false })
      .skip(offset)
      .limit(limit);

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { orders, totalPages },
      null,
      "get all order"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = orderController;
