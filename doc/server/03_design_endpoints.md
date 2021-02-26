## Design the endpoints

In this step, we are designing REST APIs for our application. The main question is **how to apply REST principles in design process?**

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

Let's design our endpoints:

- Create `/routes/auth.api.js`:

```javascript
const express = require("express");
const router = express.Router();

/**
 * @route POST api/auth/login
 * @description Login with email
 * @access Public
 */

module.exports = router;
```

- Create `/routes/product.api.js`:

```javascript
const express = require("express");
const router = express.Router();

/**
 * @route PUT api/products/
 * @description Admin Update content of product
 * @access Admin required
 */

/**
 * @route GET api/products?page=1&limit=10
 * @description User can get a list of products
 * @access Public
 */

/**
 * @route GET api/products/:id
 * @description User see a product detail
 * @access Public
 */

module.exports = router;
```

- Create `/routes/user.api.js`:

```javascript
const express = require("express");
const router = express.Router();

/**
 * @route POST api/users/
 * @description User can register for a new account
 * @access Public
 */

/**
 * @route GET api/users/me
 * @description Return current user info
 * @access Access Token required
 */

/**
 * @route GET api/users/:id/order
 * @description Return list orders of current user
 * @access Public/login Required
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
