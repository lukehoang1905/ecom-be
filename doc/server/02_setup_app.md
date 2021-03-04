## Setup app.js

- Create `/helpers/utils.helper.js`:

  ```javascript
  "use strict";
  utilsHelper = {};
  utilsHelper.sendResponse = (res, status, success, data, errors, message) => {
    const response = {};
    if (success) response.success = success;
    if (data) response.data = data;
    if (errors) response.errors = errors;
    if (message) response.message = message;
    res.status(status).json(response);
  };
  module.exports = utilsHelper;
  ```

- In `app.js`, add:

  ```diff
  +const utilsHelper = require("./helpers/utils.helper");

  const app = express();
  ```

- In `routes/index.js`, replace everything with:

  ```javascript
  const express = require("express");
  const router = express.Router();

  module.exports = router;
  ```

  In `app.js`, change:

  ```diff
  -app.use("/", indexRouter);
  +app.use("/api", indexRouter);
  ```

- Import `cors`:

  ```diff
  const logger = require("morgan");
  +const cors = require("cors")
  ...
  app.use(cookieParser());
  +app.use(cors());
  ```

- Connect to DB

  - In `.env`, add

  ```
  MONGODB_URI='mongodb://localhost:27017/ecom'
  ```

  - In `app.js`:

  ```javascript
  const mongoose = require('mongoose')
  const mongoURI = process.env.MONGODB_URI
  ...
  app.use(express.static(path.join(__dirname, "public")));

  /* DB Connections */
  mongoose
    .connect(mongoURI, {
      // some options to deal with deprecated warning
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Mongoose connected to ${mongoURI}`))
    .catch((err) => console.log(err));
  ```

- Error Handling: In `app.js`, add

  ```javascript
  /* Initialize Routes */
  app.use("/api", indexRouter);

  // catch 404 and forard to error handler
  app.use((req, res, next) => {
    const err = new Error("404 - Resource not found");
    next(err);
  });

  /* Initialize Error Handling */
  app.use((err, req, res, next) => {
    console.log("ERROR", err);
    const statusCode = err.message.split(" - ")[0];
    const message = err.message.split(" - ")[1];
    if (!isNaN(statusCode)) {
      utilsHelper.sendResponse(res, statusCode, false, null, { message }, null);
    } else {
      utilsHelper.sendResponse(
        res,
        500,
        false,
        null,
        { message: err.message },
        "Internal Server Error"
      );
    }
  });

  module.exports = app;
  ```

### Evaluation

- Run `npm run dev` in the terminal
  ![](./images/202_app_start.png)
- Open your browser and test `http://localhost:5000/api/`:
  ![](./images/200_get_messages.png)
- And test `localhost:5000/whatever`:
  ![](./images/201_not_found.png)

Good job! [Back to instructions](/README.md)
