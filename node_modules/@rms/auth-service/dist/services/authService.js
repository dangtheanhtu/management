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
exports.AuthService = void 0;
const database_1 = require("../config/database");
const shared_1 = require("@rms/shared");
const config_1 = require("../config");
const shared_2 = require("@rms/shared");
const logger_1 = require("../utils/logger");
class AuthService {
    async registerUser(userData) {
        const client = await database_1.dbPool.connect();
        try {
            await client.query('BEGIN');
            // Check if user already exists
            const existingUser = await client.query('SELECT id FROM users WHERE email = $1', [userData.email]);
            if (existingUser.rows.length > 0) {
                throw new shared_2.ConflictError('User with this email already exists');
            }
            // Hash password
            const passwordHash = await (0, shared_1.hashPassword)(userData.password);
            // Create user
            const result = await client.query(`INSERT INTO users (email, password_hash, first_name, last_name, phone, role)
         VALUES ($1, $2, $3, $4, $5, 'guest')
         RETURNING id, email, role, first_name, last_name, phone, created_at, updated_at`, [
                userData.email,
                passwordHash,
                userData.first_name,
                userData.last_name,
                userData.phone
            ]);
            const user = result.rows[0];
            // Generate JWT token
            const token = (0, shared_1.generateToken)({
                user_id: user.id,
                email: user.email,
                role: user.role
            }, config_1.config.jwt.secret, config_1.config.jwt.expiresIn);
            // Store token in Redis for session management
            await database_1.redisClient.setEx(`user_session:${user.id}`, 24 * 60 * 60, // 24 hours
            token);
            await client.query('COMMIT');
            logger_1.logger.info('User registered successfully', {
                user_id: user.id,
                email: user.email,
                role: user.role
            });
            return { user, token };
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
    async loginUser(email, password) {
        const client = await database_1.dbPool.connect();
        try {
            // Get user with password hash
            const result = await client.query('SELECT id, email, password_hash, role, first_name, last_name, phone, created_at, updated_at FROM users WHERE email = $1', [email]);
            if (result.rows.length === 0) {
                throw new shared_2.AuthenticationError('Invalid email or password');
            }
            const user = result.rows[0];
            // Verify password
            const isValidPassword = await (0, shared_1.comparePassword)(password, user.password_hash);
            if (!isValidPassword) {
                throw new shared_2.AuthenticationError('Invalid email or password');
            }
            // Generate JWT token
            const token = (0, shared_1.generateToken)({
                user_id: user.id,
                email: user.email,
                role: user.role
            }, config_1.config.jwt.secret, config_1.config.jwt.expiresIn);
            // Store token in Redis for session management
            await database_1.redisClient.setEx(`user_session:${user.id}`, 24 * 60 * 60, // 24 hours
            token);
            // Remove password hash from response
            const { password_hash, ...userWithoutPassword } = user;
            logger_1.logger.info('User logged in successfully', {
                user_id: user.id,
                email: user.email,
                role: user.role
            });
            return { user: userWithoutPassword, token };
        }
        finally {
            client.release();
        }
    }
    async getUserById(userId) {
        const client = await database_1.dbPool.connect();
        try {
            const result = await client.query('SELECT id, email, role, first_name, last_name, phone, created_at, updated_at FROM users WHERE id = $1', [userId]);
            return result.rows.length > 0 ? result.rows[0] : null;
        }
        finally {
            client.release();
        }
    }
    async updateUser(userId, updateData) {
        const client = await database_1.dbPool.connect();
        try {
            const fields = [];
            const values = [];
            let paramCount = 1;
            if (updateData.first_name !== undefined) {
                fields.push(`first_name = $${paramCount}`);
                values.push(updateData.first_name);
                paramCount++;
            }
            if (updateData.last_name !== undefined) {
                fields.push(`last_name = $${paramCount}`);
                values.push(updateData.last_name);
                paramCount++;
            }
            if (updateData.phone !== undefined) {
                fields.push(`phone = $${paramCount}`);
                values.push(updateData.phone);
                paramCount++;
            }
            if (fields.length === 0) {
                throw new Error('No fields to update');
            }
            fields.push(`updated_at = CURRENT_TIMESTAMP`);
            values.push(userId);
            const result = await client.query(`UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING id, email, role, first_name, last_name, phone, created_at, updated_at`, values);
            if (result.rows.length === 0) {
                throw new shared_2.NotFoundError('User not found');
            }
            logger_1.logger.info('User updated successfully', {
                user_id: userId,
                update_data: updateData
            });
            return result.rows[0];
        }
        finally {
            client.release();
        }
    }
    async logoutUser(userId, token) {
        try {
            // Add token to blacklist
            await database_1.redisClient.setEx(`blacklist:${token}`, 24 * 60 * 60, // 24 hours
            'true');
            // Remove user session
            await database_1.redisClient.del(`user_session:${userId}`);
            logger_1.logger.info('User logged out successfully', {
                user_id: userId
            });
        }
        catch (error) {
            logger_1.logger.error('Error during logout', {
                user_id: userId,
                error: error instanceof Error ? error.message : 'Unknown error'
            });
            throw error;
        }
    }
    async refreshToken(userId) {
        const client = await database_1.dbPool.connect();
        try {
            // Get user
            const result = await client.query('SELECT id, email, role FROM users WHERE id = $1', [userId]);
            if (result.rows.length === 0) {
                throw new shared_2.NotFoundError('User not found');
            }
            const user = result.rows[0];
            // Generate new token
            const token = (0, shared_1.generateToken)({
                user_id: user.id,
                email: user.email,
                role: user.role
            }, config_1.config.jwt.secret, config_1.config.jwt.expiresIn);
            // Update session in Redis
            await database_1.redisClient.setEx(`user_session:${user.id}`, 24 * 60 * 60, // 24 hours
            token);
            logger_1.logger.info('Token refreshed successfully', {
                user_id: userId
            });
            return { token };
        }
        finally {
            client.release();
        }
    }
    async validateToken(token) {
        try {
            const { verifyToken } = await Promise.resolve().then(() => __importStar(require('@rms/shared')));
            return verifyToken(token, config_1.config.jwt.secret);
        }
        catch (error) {
            return null;
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map