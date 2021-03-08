const utilsHelper = require("../helpers/utils.helper");
const Product = require("../models/Product");
//productentication controllers
const productController = {};

//Get all products with filter and query
productController.getAllProducts = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalProducts = await Product.count({ ...filter });

    const totalPages = Math.ceil(totalProducts / limit);
    const offset = limit * (page - 1);

    const products = await Product.find({}).skip(offset).limit(limit);
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { products, totalPages },
      null,
      "Get all product Success"
    );
  } catch (error) {
    next(error);
  }
};

//Add new product
productController.addProduct = async (req, res, next) => {
  try {
    const { name, description, price, images } = req.body;
    const products = await Product.create({
      name,
      description,
      price,
      images,
    });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { products },
      null,
      "product created"
    );
  } catch (error) {
    next(error);
  }
};
productController.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { name, description, price, images } = req.body;

    const product = await Product.findOneAndUpdate(
      {
        _id: productId,
      },
      { name, description, price, images },
      { new: true }
    );
    if (!product) {
      return next(new Error("Product not found or User not authorized"));
    }

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "Product updated"
    );
  } catch (error) {
    next(error);
  }
};
productController.getSingleProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    let product = await Product.findById(productId);

    if (!product) return next(new Error("Product not found"));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "Get detail of single product success"
    );
  } catch (error) {
    next(error);
  }
};
//delete productController
productController.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    // const product = await Product.findById(productId);
    const product = await Product.findOneAndUpdate(
      {
        _id: productId,
      },
      { isDeleted: true },
      { new: true }
    );

    if (!product) {
      return next(new Error("Product not found or User not authorized"));
    }

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "Get detail of single product success"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = productController;
