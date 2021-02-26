const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authMiddleware = {};

authMiddleware.loginRequired = (req, res, next) => {
  try {
    //get token string request header.authoriztion
    const tokenString = req.headers.authorization;
    //get only the token sequence
    if (!tokenString) return next(new Error("401-AccessToken"));
    const token = tokenString.replace("Bearer ", "");

    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return next(new Error("401 - Token expired"));
        } else {
          return next(new Error("401 - Token is invalid"));
        }
      }

      req.userId = payload._id;
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
