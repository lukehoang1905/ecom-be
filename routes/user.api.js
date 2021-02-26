const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authentication");
const userController = require("../controllers/user.controller");
/**
 * @route POST api/user/
 * @description Register with email
 * @access Public
 */

router.post("/", userController.register);

/**
 * @route GET api/user/me
 * @description Get Current User
 * @access Login required
 */
router.get("/me", authMiddleware.loginRequired, userController.getCurrentUser);

module.exports = router;
