const utilsHelper = require("../helpers/utils.helper");

//order controllers
const orderController = {};

//Create the order
orderController.createOrder = async (req, res, next) => {
  try {
    utilsHelper.sendResponse(res, 200, true, null, null, "orderen sent");
  } catch (error) {
    next(error);
  }
};
//Get order of a detail
orderController.getDetailOrder = async (req, res, next) => {
  try {
    utilsHelper.sendResponse(res, 200, true, null, null, "orderen sent");
  } catch (error) {
    next(error);
  }
}; //login with email and password
orderController.updateOrder = async (req, res, next) => {
  try {
    utilsHelper.sendResponse(res, 200, true, null, null, "orderen sent");
  } catch (error) {
    next(error);
  }
};

module.exports = orderController;
