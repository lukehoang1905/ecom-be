const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
/**
 * @route POST api/product/
 * @description get all product
 * @access Public
 */

router.get("/", productController.getAllProducts);
/**
 * @route POST api/product/add
 * @description get all product
 * @access Public
 */

router.get("/add", productController.addProduct);
/**
 * @route POST api/product/update
 * @description update
 * @access Public
 */
router.get("/update", productController.updateProduct);
/**
 * @route POST api/product/getSingleProduct
 * @description update
 * @access Public
 */
router.get("/:id", productController.getSingleProduct);

module.exports = router;
