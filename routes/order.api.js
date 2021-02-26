const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
/**
 * @route POST api/order/login
 * @description Create order
 * @access Public
 */
router.post("/", orderController.createOrder);
/**
 * @route POST api/order/login
 * @description Login with email
 * @access Public
 */
router.get("/update", orderController.updateOrder);
/**
 * @route POST api/order/login
 * @description Login with email
 * @access Public
 */
router.get("/:id", orderController.getDetailOrder);

module.exports = router;
