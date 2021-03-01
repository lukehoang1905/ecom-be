## Project structure

In the end, your project folder will look like:

```
|- bin/
|- doc/server/
|- controllers/
    |- auth.controller.js
    |- user.controller.js
    |- product.controller.js
    |- order.controler.js
|- helpers/
    |- utils.helper.js
|- middlewares/
    |- authentication.js
|- models/
    |- plugins/
        |- isDeletedFalse.js
    |- User.js
    |- Product.js
    |- Order.js
|- routes/
    |- index.js
    |- auth.api.js
    |- product.api.js
    |- order.api.js
    |- user.api.js
|- .env
|- .gitignore
|- app.js
|- package.json
```

- `doc` stores documentations that helps build this app
- `routes/` stores `.api` files that determine routes end point which is a URI and a specific HTTP request method (GET, POST, and so on). Each route have a handler function which is defined in `.controller` file.
- `models/` stores the schemas that map with the collections in your MongoDB.
- `middlewares/` stores Express middleware like Authentication or Validators.

Good job! [Back to instructions](/README.md)
