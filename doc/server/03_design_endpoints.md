## Design the endpoints

The very first step is identifying the objects which will be presented as resources, which are:

- auth: for authentication process
- product: everything about product (create, read, update, delete)
- user: CRUD of user accounts
- order: for order placement and shipping record
  Next, it's time to decide the resource URIs which are endpoints of our RESTful services. Think about the relationship between resources and its sub-resources (e.g. Product, Order, User , Auth).

**Assign HTTP Methods**: A user can perform browse, create, update, or delete operations. Typically we assign:

- `GET` for browsing
- `POST` for creating
- `PUT` for updating
- `DELETE` for removing

**Authorization**: There are different roles of users in our system, we should pre-define who can see/do what. Example: we allow everyone to see the list of products so the endpoint will look like:

```javascript
/**
 * @route GET api/products?page=1&limit=10
 * @description Get products with pagination
 * @access Public
 */
```

But if user want to add new product, they need to login and even have to be admin, so the endpoint will be defined:

```javascript
/**
 * @route POST api/product
 * @description create a product
 * @access  Admin required
 */
```

Imagine the features we would like to have in our website, each of the function is a problem we need to solve and our endpoints are the route to its solution.
`@route: is the request path`
`@description: is the feature requested by frontend`
`@access: is the authentication required for this path`

Let's design our endpoints:

- Create `/routes/auth.api.js`:

```javascript
const express = require("express");
const router = express.Router();

/**
 * @route POST api/auth/login
 * @description User can Login with email
 * @access Public
 */

module.exports = router;
```

- Create `/routes/product.api.js`:

```javascript
const express = require("express");
const router = express.Router();

//
/**
 * @route GET api/product?page=1&limit=10
 * @description User can see list of all products
 * @access Public
 */

/**
 * @route POST api/product/add
 * @description Admin can add product
 * @access Admin Required
 */

/**
 * @route PUT api/product/:id/update
 * @description Admin can update product
 * @access Admin required
 */

module.exports = router;
```

- Create `/routes/user.api.js`:

```javascript
const express = require("express");
const router = express.Router();

/**
 * @route POST api/users/
 * @description User can register account
 * @access Public
 */

/**
 * @route GET api/users/me
 * @description Return current user info
 * @access Login required
 */

/**
 * @route GET api/users/:id/order
 * @description Return list orders of current user
 * @access Login Required or Admin authorized
 */

/**
 * @route Put api/user/:id/payment
 * @description User can make payment
 * @access Login required
 */

/**
 * @route PUT api/user/:id/topup
 * @description Top-up user balance
 * @access Admin requied
 */

module.exports = router;
```

- Create `/routes/order.api.js`:

```javascript
const express = require("express");
const router = express.Router();

/**
 * @route POST api/order/login
 * @description User can create order
 * @access Login require
 */

/**
 * @route POST api/order/login
 * @description User can update order
 * @access Login require
 */

/**
 * @route POST api/order/login
 * @description User can see order detail
 * @access Login required
 */

/**
 * @route POST api/order/login
 * @description Admin can delete order
 * @access Admin required
 */

module.exports = router;
```

- Finally, in `/routes/index.js`:

```javascript
const express = require("express");
const router = express.Router();

// userApi
const userApi = require("./user.api");
router.use("/user", userApi);

// authApi
const authApi = require("./auth.api");
router.use("/auth", authApi);

// productApi
const productApi = require("./product.api");
router.use("/products", productApi);

module.exports = router;
```

We haven't done any coding task yet, but we have a plan to follow and to measure our process.

When you design your own app, remember that it doesn't need to be perfect. You can come back and modify it later on. However, always start with a plan.

Good job! [Back to instructions](/README.md)
