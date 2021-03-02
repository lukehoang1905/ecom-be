## User can log in

- Create `/controllers/auth.controller.js`:

```jsx
const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authController = {};

authController.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return next(new Error("401 - Email not exists"));

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) return next(new Error("401 - Wrong password"));

    const accessToken = await user.generateToken();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Login success"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
```

- In `routes/auth.api.js`, add:

```jsx
const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

/**
 * @route POST api/auth/login
 * @description User can login with email and password
 * @access Public
 */
router.post("/login", authController.loginWithEmail);

module.exports = router;
```

- Test with Postman:
  ![](./images/800_login.png)

### Authentication middleware

Now we have provided an access token for every user after logging in. Next, we need to build 2 middlewares:

- 1 : to validate the access token or user role in the header of the request sent by the frontend.
- 2 : to validate if request meet certain conditions

- Create `middlewares/authentication.js`:

```javascript
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const User = require("../models/User");

const authMiddleware = {};

authMiddleware.loginRequired = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) return next(new Error("401 - Access Token required"));
    const token = tokenString.replace("Bearer ", "");

    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return next(new Error("401 - Token expired"));
        } else {
          return next(new Error("401 - Token is invalid"));
        }
      }

      req.userId = payload._id;
    });
    next();
  } catch (error) {
    next(error);
  }
};

authMiddleware.adminRequired = async (req, res, next) => {
  try {
    const userId = req.userId;
    const currentUser = await User.findById(userId);
    const isAdmin = currentUser.role === "admin";

    if (!isAdmin) return next(new Error("401- Admin required"));
    req.isAdmin = isAdmin;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
```

- Create `middlewares/validation.js`:

```jsx
const utilsHelper = require("../helpers/utils.helper");
const mongoose = require("mongoose");
// install express-validator
const { validationResult } = require("express-validator");
const validators = {};

validators.validate = (validationArray) => async (req, res, next) => {
  await Promise.all(validationArray.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  // console.log(errors);
  const extractedErrors = [];
  errors
    .array()
    .map((error) => extractedErrors.push({ [error.param]: error.msg }));
  return utilsHelper.sendResponse(
    res,
    422,
    false,
    null,
    extractedErrors,
    "Validation Error missing requirements"
  );
};

validators.checkObjectId = (paramId) => {
  if (!mongoose.Types.ObjectId.isValid(paramId)) {
    throw new Error("Invalid ObjectId: Object id is not a mongodb Id");
  }
  return true;
};

module.exports = validators;
```

Good job! [Back to instructions](/README.md)
