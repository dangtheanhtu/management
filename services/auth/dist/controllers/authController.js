"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
const logger_1 = require("../utils/logger");
const shared_1 = require("@rms/shared");
const authService = new authService_1.AuthService();
class AuthController {
    async register(req, res) {
        const requestId = req.headers['x-request-id'] || (0, shared_1.generateRequestId)();
        try {
            const { user, token } = await authService.registerUser(req.body);
            logger_1.logger.info('User registration successful', {
                user_id: user.id,
                email: user.email,
                request_id: requestId
            });
            res.status(201).json({
                success: true,
                data: {
                    user,
                    token
                },
                message: 'User registered successfully',
                request_id: requestId
            });
        }
        catch (error) {
            logger_1.logger.error('User registration failed', {
                error: error instanceof Error ? error.message : 'Unknown error',
                email: req.body.email,
                request_id: requestId
            });
            const statusCode = error instanceof Error && 'statusCode' in error ? error.statusCode : 500;
            const message = error instanceof Error ? error.message : 'Registration failed';
            res.status(statusCode).json({
                success: false,
                error: message,
                request_id: requestId
            });
        }
    }
    async login(req, res) {
        const requestId = req.headers['x-request-id'] || (0, shared_1.generateRequestId)();
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.loginUser(email, password);
            logger_1.logger.info('User login successful', {
                user_id: user.id,
                email: user.email,
                request_id: requestId
            });
            res.json({
                success: true,
                data: {
                    user,
                    token
                },
                message: 'Login successful',
                request_id: requestId
            });
        }
        catch (error) {
            logger_1.logger.error('User login failed', {
                error: error instanceof Error ? error.message : 'Unknown error',
                email: req.body.email,
                request_id: requestId
            });
            const statusCode = error instanceof Error && 'statusCode' in error ? error.statusCode : 500;
            const message = error instanceof Error ? error.message : 'Login failed';
            res.status(statusCode).json({
                success: false,
                error: message,
                request_id: requestId
            });
        }
    }
    async getMe(req, res) {
        const requestId = req.headers['x-request-id'] || (0, shared_1.generateRequestId)();
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required',
                    request_id: requestId
                });
            }
            const user = await authService.getUserById(req.user.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found',
                    request_id: requestId
                });
            }
            res.json({
                success: true,
                data: { user },
                request_id: requestId
            });
        }
        catch (error) {
            logger_1.logger.error('Get user profile failed', {
                error: error instanceof Error ? error.message : 'Unknown error',
                user_id: req.user?.id,
                request_id: requestId
            });
            res.status(500).json({
                success: false,
                error: 'Failed to get user profile',
                request_id: requestId
            });
        }
    }
    async updateProfile(req, res) {
        const requestId = req.headers['x-request-id'] || (0, shared_1.generateRequestId)();
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required',
                    request_id: requestId
                });
            }
            const user = await authService.updateUser(req.user.id, req.body);
            logger_1.logger.info('User profile updated successfully', {
                user_id: user.id,
                update_data: req.body,
                request_id: requestId
            });
            res.json({
                success: true,
                data: { user },
                message: 'Profile updated successfully',
                request_id: requestId
            });
        }
        catch (error) {
            logger_1.logger.error('User profile update failed', {
                error: error instanceof Error ? error.message : 'Unknown error',
                user_id: req.user?.id,
                request_id: requestId
            });
            const statusCode = error instanceof Error && 'statusCode' in error ? error.statusCode : 500;
            const message = error instanceof Error ? error.message : 'Profile update failed';
            res.status(statusCode).json({
                success: false,
                error: message,
                request_id: requestId
            });
        }
    }
    async logout(req, res) {
        const requestId = req.headers['x-request-id'] || (0, shared_1.generateRequestId)();
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required',
                    request_id: requestId
                });
            }
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (token) {
                await authService.logoutUser(req.user.id, token);
            }
            logger_1.logger.info('User logout successful', {
                user_id: req.user.id,
                request_id: requestId
            });
            res.json({
                success: true,
                message: 'Logout successful',
                request_id: requestId
            });
        }
        catch (error) {
            logger_1.logger.error('User logout failed', {
                error: error instanceof Error ? error.message : 'Unknown error',
                user_id: req.user?.id,
                request_id: requestId
            });
            res.status(500).json({
                success: false,
                error: 'Logout failed',
                request_id: requestId
            });
        }
    }
    async refreshToken(req, res) {
        const requestId = req.headers['x-request-id'] || (0, shared_1.generateRequestId)();
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required',
                    request_id: requestId
                });
            }
            const { token } = await authService.refreshToken(req.user.id);
            logger_1.logger.info('Token refresh successful', {
                user_id: req.user.id,
                request_id: requestId
            });
            res.json({
                success: true,
                data: { token },
                message: 'Token refreshed successfully',
                request_id: requestId
            });
        }
        catch (error) {
            logger_1.logger.error('Token refresh failed', {
                error: error instanceof Error ? error.message : 'Unknown error',
                user_id: req.user?.id,
                request_id: requestId
            });
            const statusCode = error instanceof Error && 'statusCode' in error ? error.statusCode : 500;
            const message = error instanceof Error ? error.message : 'Token refresh failed';
            res.status(statusCode).json({
                success: false,
                error: message,
                request_id: requestId
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map