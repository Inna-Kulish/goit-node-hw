const express = require("express");

const {userController} = require("../../controllers")

const router = express.Router();

const { authenticate, userMiddleware } = require("../../middlewares");

// singup
router.post("/register", userMiddleware.checkRegisterUserData, userController.register);

// singin
router.post("/login", userMiddleware.checkLoginUserData, userController.login);

router.get("/current", authenticate, userController.getCurrent)

router.post("/logout", authenticate, userController.logout);

router.patch("/", authenticate, userMiddleware.checkUpdateSubscription, userController.updateSubscription)

module.exports = router;
