const utilsHelper = require("../helpers/utils.helper");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Order = require("../models/Order");
//user controllers
const userController = {};

//register user
userController.register = async (req, res, next) => {
  try {
    const { name, email, password, avatarUrl } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new Error("402- Email existed"));
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await User.create({
      name,
      email,
      password,
      avatarUrl,
    });
    utilsHelper.sendResponse(res, 200, true, { user }, null, "registered");
  } catch (error) {
    next(error);
  }
};

//get current user .
userController.getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) return next(new Error("401 - user not found"));
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "get current user success"
    );
  } catch (error) {
    next(error);
    d;
  }
};

//Get order of current user
userController.getCurrentUserOrder = async (req, res, next) => {
  try {
    //pagination
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalOrders = await Order.count({ ...filter, isDeleted: false });

    const totalPages = Math.ceil(totalOrders / limit);
    const offset = limit * (page - 1);
    //current user
    const currentUserId = req.userId;
    const currentUser = await User.findById(currentUserId);

    //target user
    const userId = req.params.id;

    // current user request other Order
    if (userId !== currentUserId && currentUser.role !== "admin") {
      return next(
        new Error("401- only admin able to check other user Order detail")
      );
    }
    // current user request its Order or Admin request user's order
    const order = await Order.find({ userId })
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);
    // in case no order
    if (!order) return next(new Error(`401- ${user} has no order`));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order, totalPages },
      null,
      "get order from userId success"
    );
  } catch (error) {
    next(error);
  }
};

userController.paymentUserOrder = async (req, res, next) => {
  try {
    //get request detail
    const orderId = req.params.id;
    const currentUserId = req.userId;

    //find the order to pay , get balance
    let order = await Order.findById(orderId);
    let currentUser = await User.findById(currentUserId);
    const total = order.total;
    const funds = currentUser.balance;
    //check funds
    if (total > funds) return next(new Error("403-Insufficient balance"));

    //update new balance
    user = await User.findOneAndUpdate(
      {
        _id: currentUserId,
      },
      { balance: funds - total },
      { new: true }
    );
    //update new order
    order = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      { status: "paid" },
      { new: true }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
