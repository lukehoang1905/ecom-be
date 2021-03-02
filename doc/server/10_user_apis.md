## User APIs

In this step we will create route so that each request of frontend connected to its unique controllers that may Create, Retrieve, Update or Delete data from our Database.
**The codes below are INCOMPLETE , there are more work to do, and it is up to you heros!!**

- Create `/controllers/user.controller.js`:

```jsx
userController.register = async (req, res, next) => {
    //SOMETHING MISSING HERE !!
};

//get current user .
userController.getCurrentUser = async (req, res, next) => {
  try {
    //SOMETHING MISSING HERE !!
};

//Get order of current user
userController.getCurrentUserOrder = async (req, res, next) => {
  try {
    //pagination
    let { page, limit, sortBy, ...filter } = { ...req.query };
     //SOMETHING MISSING HERE !!

    const totalOrders = await Order.count({ ...filter, isDeleted: false });

    const totalPages = Math.ceil(totalOrders / limit);
    const offset = limit * (page - 1);
    //current user
      //SOMETHING MISSING HERE !!
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
    const orderId =   //SOMETHING MISSING HERE !!
    const currentUserId =   //SOMETHING MISSING HERE !!

    //find the order to pay , get balance
    let order = await Order.  //SOMETHING MISSING HERE !!
    let currentUser = await User.  //SOMETHING MISSING HERE !!
    const total = order.total;
    const funds = currentUser.balance;
    //check funds
    if (total > funds) return next(new Error("403-Insufficient balance"));

    //update new balance
    user =   //SOMETHING MISSING HERE !!
    (
      {
        _id: currentUserId,
      },
      { balance: funds - total },
      { new: true }
    );
    //update new order
    order =   //SOMETHING MISSING HERE !!
    (
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
```

- In `routes/user.api.js`:

```jsx
/**
 * @route POST api/user/
 * @description User can register account
 * @access Public
 */

router.post("/", userController.register);

/**
 * @route GET api/user/me
 * @description Return current user info
 * @access Login required
 */
router.get("/me", authMiddleware.loginRequired, userController.getCurrentUser);

/**
 * @route GET api/users/:id/order
 * @description Return list orders of current user
 * @access Login required or Admin authorized
 */
router.get(
  "/:id/order"
  //SOMETHING MISSING HERE !!
  //SOMETHING MISSING HERE !!
);

/**
 * @route Put api/user/:id/payment
 * @description User can make payment
 * @access Login required
 */
router.put(
  "/:id/payment",
  //SOMETHING MISSING HERE !!
  //SOMETHING MISSING HERE !!
  userController.paymentUserOrder
);

/**
 * @route PUT api/user/:id/top
 * @description Top-up user balance
 * @access Login required
 */
router.put(
  "/:id/topup",
  authMiddleware.loginRequired
  //SOMETHING MISSING HERE !!
);
```

Good job! [Back to instructions](/README.md)
