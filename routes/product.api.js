const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/authentication");
/**
 * @route GET api/product?page=1&limit=10
 * @description User can see list of all products
 * @access Public
 */
router.get("/", productController.getAllProducts);

/**
 * @route POST api/product/add
 * @description Admin can add product
 * @access Admin Required
 */

router.post(
  "/add",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  productController.addProduct
);

/**
 * @route PUT api/product/:id/update
 * @description Admin can update product
 * @access Admin required
 */
router.put(
  "/:id/update",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  productController.updateProduct
);

/**
 * @route POST api/product/getSingleProduct
 * @description get single product
 * @access Public
 */
router.get("/:id", productController.getSingleProduct);

/**
 * @route POST api/product/getSingleProduct
 * @description delete single product
 * @access Public
 */
router.delete("/:id", productController.deleteProduct);

module.exports = router;
