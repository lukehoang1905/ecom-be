## Product APIs

In this step we will create route so that each request of frontend connected to its unique controllers that may Create, Retrieve, Update or Delete data from our Database.
**The codes below are INCOMPLETE , there are more work to do, and it is up to you heros!!**

- Create `/controllers/product.controller.js`:

```jsx

//productentication controllers
const productController = {};

//Get all products with filter and query
productController.getAllProducts = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalProducts = await Product.count({ ...filter, isDeleted: false });

    const totalPages = Math.ceil(totalProducts / limit);
    const offset = limit * (page - 1);

   //SOMETHING MISSING HERE !! Mongoose ?
   .skip(offset).limit(limit);
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { products, totalPages },
      null,
      "Get all product Success"
    );
  } catch (error) {
    next(error);
  }
};

//Add new product
productController.addProduct = async (req, res, next) => {
  try {
    //SOMETHING MISSING HERE !! Req.?
    const products = await Product.create({
      name,
      description,
      price,
      images,
    });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { products },
      null,
      "product created"
    );
  } catch (error) {
    next(error);
  }
};
//admin update product
productController.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { name, description, price, images } = req.body;

    const product = await Product.findOneAndUpdate(
      {
         //SOMETHING MISSING HERE !!
      },
      {  //SOMETHING MISSING HERE !!
      },
      {  //SOMETHING MISSING HERE !!
      }
    );
    if (!product) {
      return next(
        new Error(

          "Product not found or User not authorized",
        )
      );
    }

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "Product updated"
    );
  } catch (error) {
    next(error);
  }
};
productController.getSingleProduct = async (req, res, next) => {
  try {
    //SOMETHING MISSING HERE !!

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "Get detail of single product success"
    );
  } catch (error) {
    next(error);
  }
};
//delete productController
productController.deleteProduct = async (req, res, next) => {
  try {
   //SOMETHING MISSING HERE !!
    if (!product) {
      return next(
        new Error(

          "Product not found or User not authorized",

        )
      );
    }
  } catch (error) {
    next(error);
  }
};

```

- In `routes/product.api.js`:

```jsx
/**
 * @description User can see list of all products
 */
router.get("/", productController.getAllProducts);
/**
 * @description Admin can add product
 */
router.post(
  "/add",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  productController.addProduct
);
/**
 * @description Admin can update product

 */
router.put(
  ":id/update",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  productController.updateProduct
);
/**
 * @description get single product
 */
router.get("/:id", productController.getSingleProduct);
/**
 * @description delete single product
 */
router.delete("/:id", productController.deleteProduct);
```

Good job! [Back to instructions](/README.md)
