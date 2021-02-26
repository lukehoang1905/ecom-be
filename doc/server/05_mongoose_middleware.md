### Generate Token for authenticated user

When someone log in, the system will generate a new access token for that user. We will put the function to generate the token in User model as a instance method:

- In `/.env`, add:

  ```
  JWT_SECRET_KEY="any_secret_key"
  ```

  Remember when you change something in `.env` you need to restart your app.

- In `models/User.js`, add:

  ```javascript
  //...
  const jwt = require("jsonwebtoken");
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  //...

  userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;
    delete obj.emailVerified;
    delete obj.emailVerificationCode;
    delete obj.isDeleted;
    return obj;
  };

  userSchema.methods.generateToken = async function () {
    const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return accessToken;
  };
  ```

  We also add `toJSON()` to remove the fields that we don't want to response to the frontend when we need to provide user info.

Good job! [Back to instructions](/README.md)
