## Register user account and validators

### Register user

- Create `/controllers/user.controller.js`:

```javascript
const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");
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

module.exports = userController;
```

- In `user.api.js`, add:

  ```javascript
  //...
  const userController = require("../controllers/user.controller");

  /**
   * @route POST api/users
   * @description Register new user
   * @access Public
   */
  router.post("/", userController.register);
  ```

Good job! [Back to instructions](/README.md)
