"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFoundHandler = notFoundHandler;
const shared_1 = require("@rms/shared");
const logger_1 = require("../utils/logger");
function errorHandler(error, req, res, next) {
    const requestId = req.headers['x-request-id'];
    // Log error
    logger_1.logger.error('Error occurred', {
        error: error.message,
        stack: error.stack,
        request_id: requestId,
        url: req.url,
        method: req.method,
        ip: req.ip,
        user_agent: req.get('User-Agent'),
    });
    // Handle operational errors
    if ((0, shared_1.isOperationalError)(error)) {
        const statusCode = (0, shared_1.getErrorStatusCode)(error);
        return res.status(statusCode).json({
            success: false,
            error: error.message,
            request_id: requestId,
        });
    }
    // Handle JWT errors
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            error: 'Invalid token',
            request_id: requestId,
        });
    }
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            error: 'Token expired',
            request_id: requestId,
        });
    }
    // Handle database errors
    if (error.name === 'QueryResultError') {
        return res.status(404).json({
            success: false,
            error: 'Resource not found',
            request_id: requestId,
        });
    }
    // Handle validation errors
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: error.message,
            request_id: requestId,
        });
    }
    // Handle unknown errors
    logger_1.logger.error('Unhandled error', {
        error: error.message,
        stack: error.stack,
        request_id: requestId,
    });
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        request_id: requestId,
    });
}
function notFoundHandler(req, res, next) {
    const requestId = req.headers['x-request-id'];
    res.status(404).json({
        success: false,
        error: 'Route not found',
        request_id: requestId,
    });
}
//# sourceMappingURL=errorHandler.js.map