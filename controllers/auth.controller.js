const utilsHelper = require("../helpers/utils.helper");

const bcrypt = require("bcryptjs");
const User = require("../models/User");
//authentication controllers
const authController = {};

//login with email and password
authController.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //find user with requested email
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) return next(new Error("401- email not exist"));

    //use bcrypt to compare password received and user.password
    let isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) return next(new Error("401- wrong password"));

    //generate accessToken for persitent login
    const accessToken = await user.generateToken();

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { accessToken },
      null,
      "Login sucess"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
