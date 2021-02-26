const express = require("express");
const router = express.Router();

// userApi : Register, Get all, get detail
const userApis = require("./user.api");
router.use("/user", userApis);

// authApi : Login, Logout
const authApis = require("./auth.api");
router.use("/auth", authApis);

// productsApi : CRUD for products
const productApis = require("./product.api");
router.use("/product", productApis);

// orderApi : CRUD for orders
const orderApis = require("./order.api");
router.use("/order", orderApis);
module.exports = router;
