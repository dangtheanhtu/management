"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
exports.requireRole = requireRole;
exports.requirePermission = requirePermission;
exports.optionalAuth = optionalAuth;
const shared_1 = require("@rms/shared");
const config_1 = require("../config");
const database_1 = require("../config/database");
const shared_2 = require("@rms/shared");
async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            throw new shared_2.AuthenticationError('Access token required');
        }
        // Check if token is blacklisted
        const isBlacklisted = await database_1.redisClient.get(`blacklist:${token}`);
        if (isBlacklisted) {
            throw new shared_2.AuthenticationError('Token has been revoked');
        }
        // Verify token
        const decoded = (0, shared_1.verifyToken)(token, config_1.config.jwt.secret);
        // Get user from database to ensure user still exists
        const { dbPool } = await Promise.resolve().then(() => __importStar(require('../config/database')));
        const result = await dbPool.query('SELECT id, email, role FROM users WHERE id = $1', [decoded.user_id]);
        if (result.rows.length === 0) {
            throw new shared_2.AuthenticationError('User not found');
        }
        req.user = result.rows[0];
        next();
    }
    catch (error) {
        if (error instanceof shared_2.AuthenticationError) {
            return res.status(401).json({
                success: false,
                error: error.message,
                request_id: req.headers['x-request-id']
            });
        }
        console.error('Authentication error:', error);
        res.status(401).json({
            success: false,
            error: 'Invalid token',
            request_id: req.headers['x-request-id']
        });
    }
}
function requireRole(roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required',
                request_id: req.headers['x-request-id']
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Insufficient permissions',
                request_id: req.headers['x-request-id']
            });
        }
        next();
    };
}
function requirePermission(permission) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required',
                request_id: req.headers['x-request-id']
            });
        }
        // Import role permissions mapping
        const { ROLE_PERMISSIONS } = require('@rms/shared');
        const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];
        if (!userPermissions.includes(permission)) {
            return res.status(403).json({
                success: false,
                error: 'Insufficient permissions',
                request_id: req.headers['x-request-id']
            });
        }
        next();
    };
}
async function optionalAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            const isBlacklisted = await database_1.redisClient.get(`blacklist:${token}`);
            if (!isBlacklisted) {
                const decoded = (0, shared_1.verifyToken)(token, config_1.config.jwt.secret);
                const { dbPool } = await Promise.resolve().then(() => __importStar(require('../config/database')));
                const result = await dbPool.query('SELECT id, email, role FROM users WHERE id = $1', [decoded.user_id]);
                if (result.rows.length > 0) {
                    req.user = result.rows[0];
                }
            }
        }
    }
    catch (error) {
        // Silently fail for optional auth
        console.debug('Optional auth failed:', error);
    }
    next();
}
//# sourceMappingURL=auth.js.map