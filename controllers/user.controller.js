const utilsHelper = require("../helpers/utils.helper");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
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
  }
};

module.exports = userController;
