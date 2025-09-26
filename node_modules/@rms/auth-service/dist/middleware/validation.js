"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;
exports.validateUserUpdate = validateUserUpdate;
const shared_1 = require("@rms/shared");
function validateRegistration(req, res, next) {
    try {
        req.body = (0, shared_1.validate)(shared_1.userRegistrationSchema, req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Validation failed',
            request_id: req.headers['x-request-id']
        });
    }
}
function validateLogin(req, res, next) {
    try {
        req.body = (0, shared_1.validate)(shared_1.userLoginSchema, req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Validation failed',
            request_id: req.headers['x-request-id']
        });
    }
}
function validateUserUpdate(req, res, next) {
    try {
        req.body = (0, shared_1.validate)(shared_1.userUpdateSchema, req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Validation failed',
            request_id: req.headers['x-request-id']
        });
    }
}
//# sourceMappingURL=validation.js.map