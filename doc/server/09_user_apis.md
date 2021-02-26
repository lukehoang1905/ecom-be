## User APIs

In this step, we will implement these APIs:

- Get current user info
- Update user profile
- Get list of users with pagination

- In `user.controller.js`, add:

```jsx
const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");
const Message = require("../models/Message");
const User = require("../models/User");
const userController = {};

userController.register = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) return next(new Error("401 - Email already exists"));

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password });

    utilsHelper.sendResponse(res, 200, true, { user }, null, "Created account");
  } catch (error) {
    next(error);
  }
};

userController.getMessagesOfUser = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user) return next(new Error("404 - User not found"));
    let messages;
    if (user.role !== "admin") {
      messages = await Message.find({ to: userId })
        .populate("from")
        .sort("-createdAt");
    } else if (user.role === "admin") {
      messages = await Message.find()
        .populate("from")
        .populate("to")
        .sort("-createdAt");
    }

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { messages },
      null,
      "Get messages success"
    );
  } catch (error) {
    next(error);
  }
};

userController.getCurrentUser = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const user = await User.findById(currentUserId);
    if (!user) return next(new Error("401 - User not found"));
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "Get current user success"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
```

- In `user.api.js`, add:

```jsx
const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authentication");
const router = express.Router();

/**
 * @route POST api/users/
 * @description User can register for a new account
 * @access Public
 */
router.post("/", userController.register);

/**
 * @route GET api/users/me
 * @description Return current user info
 * @access Access Token required
 */
router.get("/me", authMiddleware.loginRequired, userController.getCurrentUser);

/**
 * @route GET api/users/:id/messages
 * @description Return list of messages sent to current user
 * @access Public
 */
router.get(
  "/:id/messages",
  authMiddleware.loginRequired,
  userController.getMessagesOfUser
);

module.exports = router;
```

- Test with Postman, you should pass all the request in folder `User`.
  ![](./images/C00_user_apis.png)

Good job! [Back to instructions](/README.md)
