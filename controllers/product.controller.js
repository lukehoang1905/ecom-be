const utilsHelper = require("../helpers/utils.helper");

//productentication controllers
const productController = {};

//login with email and password
productController.getAllProducts = async (req, res, next) => {
  try {
    utilsHelper.sendResponse(res, 200, true, null, null, "producten sent");
  } catch (error) {
    next(error);
  }
};
productController.addProduct = async (req, res, next) => {
  try {
    utilsHelper.sendResponse(res, 200, true, null, null, "producten sent");
  } catch (error) {
    next(error);
  }
};
productController.updateProduct = async (req, res, next) => {
  try {
    utilsHelper.sendResponse(res, 200, true, null, null, "producten sent");
  } catch (error) {
    next(error);
  }
};
productController.getSingleProduct = async (req, res, next) => {
  try {
    utilsHelper.sendResponse(res, 200, true, null, null, "producten sent");
  } catch (error) {
    next(error);
  }
};

module.exports = productController;
