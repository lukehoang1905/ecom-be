const utilsHelper = require("../helpers/utils.helper");
const Order = require("../models/Order");

//order controllers
const orderController = {};

//Create the order
orderController.createOrder = async (req, res, next) => {
  try {
    const { userId, products } = req.body;
    // create Order that represent
    const order = Order.create({
      userId,
      products,
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
    const order = Order.findById({ orderId });
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

    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      { products },
      { new: true }
    );
    if (!order) {
      return next(
        new AppError(
          400,
          "order not found or User not authorized",
          "Update order Success"
        )
      );
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
      return next(
        new AppError(
          400,
          "order not found or User not authorized",
          "Deleteorder Error"
        )
      );
    }
  } catch (error) {
    next(error);
  }
};
module.exports = orderController;
