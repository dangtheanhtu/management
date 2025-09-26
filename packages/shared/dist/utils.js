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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.decodeToken = decodeToken;
exports.hasPermission = hasPermission;
exports.hasAnyPermission = hasAnyPermission;
exports.hasAllPermissions = hasAllPermissions;
exports.isManager = isManager;
exports.isReceptionist = isReceptionist;
exports.isGuest = isGuest;
exports.formatDate = formatDate;
exports.addDays = addDays;
exports.getDaysBetween = getDaysBetween;
exports.isDateInRange = isDateInRange;
exports.isValidEmail = isValidEmail;
exports.isValidPhone = isValidPhone;
exports.isValidDate = isValidDate;
exports.isFutureDate = isFutureDate;
exports.generateRandomString = generateRandomString;
exports.generateTransactionId = generateTransactionId;
exports.slugify = slugify;
exports.roundToTwoDecimals = roundToTwoDecimals;
exports.calculateDiscount = calculateDiscount;
exports.calculateTax = calculateTax;
exports.chunk = chunk;
exports.unique = unique;
exports.groupBy = groupBy;
exports.pick = pick;
exports.omit = omit;
exports.isOperationalError = isOperationalError;
exports.getErrorStatusCode = getErrorStatusCode;
exports.formatLogMessage = formatLogMessage;
exports.generateRequestId = generateRequestId;
exports.sanitizeForLogging = sanitizeForLogging;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const constants_1 = require("./constants");
// Password utilities
async function hashPassword(password) {
    const saltRounds = 12;
    return bcrypt_1.default.hash(password, saltRounds);
}
async function comparePassword(password, hash) {
    return bcrypt_1.default.compare(password, hash);
}
// JWT utilities
// JWT utilities
function generateToken(payload, secret, expiresIn = '24h') {
    return jwt.sign(payload, secret, { expiresIn });
}
function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}
function decodeToken(token) {
    try {
        return jwt.decode(token);
    }
    catch {
        return null;
    }
}
// RBAC utilities
function hasPermission(userRole, permission) {
    const rolePermissions = constants_1.ROLE_PERMISSIONS[userRole] || [];
    return rolePermissions.includes(permission);
}
function hasAnyPermission(userRole, permissions) {
    return permissions.some(permission => hasPermission(userRole, permission));
}
function hasAllPermissions(userRole, permissions) {
    return permissions.every(permission => hasPermission(userRole, permission));
}
function isManager(userRole) {
    return userRole === constants_1.ROLES.MANAGER;
}
function isReceptionist(userRole) {
    return userRole === constants_1.ROLES.RECEPTIONIST;
}
function isGuest(userRole) {
    return userRole === constants_1.ROLES.GUEST;
}
// Date utilities
function formatDate(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}
function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}
function getDaysBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
function isDateInRange(date, startDate, endDate) {
    const d = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return d >= start && d <= end;
}
// Validation utilities
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}
function isValidDate(date) {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
}
function isFutureDate(date) {
    const d = new Date(date);
    const now = new Date();
    return d > now;
}
// String utilities
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function generateTransactionId() {
    const timestamp = Date.now().toString(36);
    const random = generateRandomString(8);
    return `txn_${timestamp}_${random}`;
}
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
// Number utilities
function roundToTwoDecimals(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}
function calculateDiscount(amount, discountPercent, maxDiscount) {
    const discount = (amount * discountPercent) / 100;
    if (maxDiscount && discount > maxDiscount) {
        return maxDiscount;
    }
    return roundToTwoDecimals(discount);
}
function calculateTax(amount, taxRate = 0.1) {
    return roundToTwoDecimals(amount * taxRate);
}
// Array utilities
function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}
function unique(array) {
    return [...new Set(array)];
}
function groupBy(array, key) {
    return array.reduce((groups, item) => {
        const group = String(item[key]);
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;
    }, {});
}
// Object utilities
function pick(obj, keys) {
    const result = {};
    keys.forEach((key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}
function omit(obj, keys) {
    const result = { ...obj };
    keys.forEach(key => {
        delete result[key];
    });
    return result;
}
// Error utilities
function isOperationalError(error) {
    if (error instanceof Error) {
        return error.isOperational === true;
    }
    return false;
}
function getErrorStatusCode(error) {
    if (error instanceof Error && 'statusCode' in error) {
        return error.statusCode;
    }
    return 500;
}
// Logging utilities
function formatLogMessage(level, message, meta) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        level,
        message,
        ...meta
    };
    return JSON.stringify(logEntry);
}
// Request utilities
function generateRequestId() {
    return `req_${Date.now()}_${generateRandomString(8)}`;
}
function sanitizeForLogging(data) {
    const sensitiveFields = ['password', 'password_hash', 'token', 'secret', 'key'];
    if (typeof data !== 'object' || data === null) {
        return data;
    }
    if (Array.isArray(data)) {
        return data.map(item => sanitizeForLogging(item));
    }
    const sanitized = { ...data };
    Object.keys(sanitized).forEach((key) => {
        if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
            sanitized[key] = '[REDACTED]';
        }
        else if (typeof sanitized[key] === 'object') {
            sanitized[key] = sanitizeForLogging(sanitized[key]);
        }
    });
    return sanitized;
}
//# sourceMappingURL=utils.js.map