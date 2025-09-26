"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const rateLimit_1 = require("../middleware/rateLimit");
const router = (0, express_1.Router)();
const authController = new authController_1.AuthController();
// Public routes
router.post('/signup', rateLimit_1.authRateLimit, validation_1.validateRegistration, authController.register.bind(authController));
router.post('/login', rateLimit_1.authRateLimit, validation_1.validateLogin, authController.login.bind(authController));
// Protected routes
router.get('/me', auth_1.authenticateToken, authController.getMe.bind(authController));
router.put('/me', auth_1.authenticateToken, validation_1.validateUserUpdate, authController.updateProfile.bind(authController));
router.post('/logout', auth_1.authenticateToken, authController.logout.bind(authController));
router.post('/refresh', auth_1.authenticateToken, authController.refreshToken.bind(authController));
exports.default = router;
//# sourceMappingURL=auth.js.map