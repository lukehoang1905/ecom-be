const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/authentication");
/**
 * @route POST api/order/login
 * @description User can create order
 * @access Login require
 */
router.post("/", authMiddleware.loginRequired, orderController.createOrder);
/**
 * @route POST api/order/login
 * @description User can update order
 * @access Login require
 */
router.put(
  "/:id/update",
  authMiddleware.loginRequired,
  orderController.updateOrder
);

/**
 * @route POST api/order/login
 * @description User can see order detail
 * @access Login required
 */
router.get(
  "/:id",
  authMiddleware.loginRequired,
  orderController.getDetailOrder
);

/**
 * @route GET api/order/login
 * @description Admin can see all order
 * @access Admin required
 */
router.get(
  "/",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  orderController.getAllOrder
);

module.exports = router;
