## Order APIs

In this step we will create route so that each request of frontend connected to its unique controllers that may Create, Retrieve, Update or Delete data from our Database.
**The codes below are INCOMPLETE , there are more work to do, and it is up to you heros!!**

- Create `/controllers/order.controller.js`:

```jsx
//Create the order
orderController.createOrder = async (req, res, next) => {
  try {
    const { userId, products } = req.body;
    // create Order that represent
    //SOMETHING MISSING HERE !!
    //
    utilsHelper.sendResponse(res, 200, true, { order }, null, "Order created");
  } catch (error) {
    next(error);
  }
};

//Get detail of an order by its ID
orderController.getDetailOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    //SOMETHING MISSING HERE !!
    if (!order) return next(new Error("401- Order not found"));
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "get detail order success"
    );
  } catch (error) {
    next(error);
  }
};
//Update Order
orderController.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { products } = req.body;

    //SOMETHING MISSING HERE !!
    if (!order) {
      return next(new Error("order not found or User not authorized"));
    }
    utilsHelper.sendResponse(res, 200, true, { order }, null, "order send");
  } catch (error) {
    next(error);
  }
};
//

//delete order
orderController.deleteOrder = async (req, res, next) => {
  try {
    //SOMETHING MISSING HERE !!
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      { isDeleted: true },
      { new: true }
    );
    if (!order) {
      return next(new Error("order not found or User not authorized"));
    }
  } catch (error) {
    next(error);
  }
};
```

- In `routes/order.api.js`:

```jsx
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
  //SOMETHING MISSING HERE !!
  orderController.updateOrder
);

/**
 * @route POST api/order/login
 * @description User can see order detail
 * @access Login required
 */
router.get(
  "/:id",
  authMiddleware.loginRequired
  //SOMETHING MISSING HERE !!
);

/**
 * @route POST api/order/login
 * @description Admin can delete order
 * @access Admin required
 */
router.delete(
  "/:id",
  authMiddleware.loginRequired,
  //SOMETHING MISSING HERE !!
  orderController.getDetailOrder
);

module.exports = router;
```

Good job! [Back to instructions](/README.md)
