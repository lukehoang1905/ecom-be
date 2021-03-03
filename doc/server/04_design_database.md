## Design database schema

In this step, we work on Mongoose schemas and middlewares. It's worth to think about it seriously because the database is the core of your platform.

- Create `/models/Product.js`:

  ```javascript
  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;
  const productSchema = Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      images: [{ imageUrl: { type: String, required: true } }],
      isDeleted: { type: Boolean, default: false },
    },
    { timestamp: true }
  );
  productSchema.plugin(require("./plugins/isDeletedFalse"));

  const product = mongoose.model("Product", productSchema);
  module.exports = Product;
  ```

  You can see that we have `isDeletedFalse` plugin. It purpose is to find if any document created without `isDeleted` and it will add `isDeleted:false` to that document.
  The idea is we will not permanently delete the product. If user want to delete a product, we turn the `isDeleted` value to `true`. It's quite common to keep the "important" data like this example.

  Then when user browse products, we only return products with `isDeleted` is `false`. To automate that we integrate a mongoose plugin for the product schema.

- Create `models/User.js`:

  ```javascript
  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;

  const userSchema = Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ["user", "admin"] },
      balance: { type: Number, default: 0 },
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  userSchema.plugin(require("./plugins/isDeletedFalse"));

  const User = mongoose.model("User", userSchema);
  module.exports = User;
  ```

- Create `models/Order.js`:

  ```javascript
  const orderSchema = Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      status: { type: String, emum: ["pending", "paid"], default: "pending" },
      total: { type: Number, default: 0 },
      isDeleted: { type: Boolean, default: false },
    },
    { timestamp: true }
  );
  orderSchema.plugin(require("./plugins/isDeletedFalse"));
  ```

### Evaluation

- Run `npm run dev`, you should see on the terminal:
  ![](./images/400_server_log_1.png)
  ...
  ![](./images/401_server_log_2.png)

- You can also find the data in the DB using Compass:
  ![](./images/402_compass.png)

Good job! [Back to instructions](/README.md)
