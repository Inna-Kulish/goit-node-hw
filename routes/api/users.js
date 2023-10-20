const express = require("express");

const {userController} = require("../../controllers")

const router = express.Router();

const { authenticate, upload, validateBody } = require("../../middlewares");

const { userValidators } = require('../../helpers');

// singup
router.post("/register", validateBody(userValidators.registerSchema), userController.register);

// verification
router.get("/verify/:verificationToken", userController.verifyEmail);

router.post("/verify", validateBody(userValidators.emailSchema), userController.resendVerifyEmail);

// singin
router.post("/login", validateBody(userValidators.loginSchema), userController.login);

router.get("/current", authenticate, userController.getCurrent)

router.post("/logout", authenticate, userController.logout);

router.patch("/", authenticate, validateBody(userValidators.updateSubscription), userController.updateSubscription)

router.patch("/avatars", authenticate, upload, userController.updateAvatar)

module.exports = router;
