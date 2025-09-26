"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_LEVELS = exports.ENVIRONMENTS = exports.HTTP_STATUS = exports.EVENT_TYPES = exports.NOTIFICATION_TYPES = exports.PAYMENT_PROVIDERS = exports.BUSINESS_RULES = exports.RATE_LIMITS = exports.CACHE_TTL = exports.CACHE_KEYS = exports.API_ENDPOINTS = exports.ROLE_PERMISSIONS = exports.PERMISSIONS = exports.ROLES = void 0;
// RBAC Constants
exports.ROLES = {
    GUEST: 'guest',
    RECEPTIONIST: 'receptionist',
    MANAGER: 'manager'
};
exports.PERMISSIONS = {
    // Booking permissions
    CREATE_BOOKING: 'create_booking',
    READ_OWN_BOOKINGS: 'read_own_bookings',
    READ_ALL_BOOKINGS: 'read_all_bookings',
    UPDATE_BOOKING: 'update_booking',
    CANCEL_BOOKING: 'cancel_booking',
    // Room permissions
    READ_ROOMS: 'read_rooms',
    UPDATE_ROOM_PRICE: 'update_room_price',
    UPDATE_ROOM_STATUS: 'update_room_status',
    // Payment permissions
    CREATE_PAYMENT: 'create_payment',
    READ_PAYMENTS: 'read_payments',
    PROCESS_REFUND: 'process_refund',
    // Check-in/out permissions
    CHECK_IN: 'check_in',
    CHECK_OUT: 'check_out',
    // Housekeeping permissions
    UPDATE_HOUSEKEEPING: 'update_housekeeping',
    // Admin permissions
    MANAGE_PROMOTIONS: 'manage_promotions',
    VIEW_REPORTS: 'view_reports',
    MANAGE_USERS: 'manage_users',
    // Audit permissions
    VIEW_AUDIT_LOGS: 'view_audit_logs'
};
exports.ROLE_PERMISSIONS = {
    [exports.ROLES.GUEST]: [
        exports.PERMISSIONS.CREATE_BOOKING,
        exports.PERMISSIONS.READ_OWN_BOOKINGS,
        exports.PERMISSIONS.READ_ROOMS,
        exports.PERMISSIONS.CREATE_PAYMENT
    ],
    [exports.ROLES.RECEPTIONIST]: [
        exports.PERMISSIONS.READ_ALL_BOOKINGS,
        exports.PERMISSIONS.UPDATE_BOOKING,
        exports.PERMISSIONS.CANCEL_BOOKING,
        exports.PERMISSIONS.READ_ROOMS,
        exports.PERMISSIONS.UPDATE_ROOM_STATUS,
        exports.PERMISSIONS.READ_PAYMENTS,
        exports.PERMISSIONS.CHECK_IN,
        exports.PERMISSIONS.CHECK_OUT,
        exports.PERMISSIONS.UPDATE_HOUSEKEEPING
    ],
    [exports.ROLES.MANAGER]: [
        // All permissions
        ...Object.values(exports.PERMISSIONS)
    ]
};
// API Constants
exports.API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        SIGNUP: '/auth/signup',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        REFRESH: '/auth/refresh'
    },
    // Room endpoints
    ROOMS: {
        LIST: '/rooms',
        AVAILABILITY: '/rooms/availability',
        DETAILS: '/rooms/:id',
        UPDATE_PRICE: '/admin/rooms/:id/price',
        UPDATE_STATUS: '/ops/housekeeping/:roomId/status'
    },
    // Booking endpoints
    BOOKINGS: {
        CREATE: '/bookings',
        LIST: '/bookings',
        DETAILS: '/bookings/:id',
        CANCEL: '/bookings/:id/cancel',
        MY_BOOKINGS: '/bookings/my'
    },
    // Payment endpoints
    PAYMENTS: {
        CREATE: '/payments/:bookingId/pay',
        WEBHOOK: '/payments/webhook',
        REFUND: '/payments/:bookingId/refund'
    },
    // Operations endpoints
    OPS: {
        CHECKIN: '/ops/checkin/:bookingId',
        CHECKOUT: '/ops/checkout/:bookingId'
    },
    // Admin endpoints
    ADMIN: {
        PROMOTIONS: '/admin/promotions',
        USERS: '/admin/users',
        AUDIT_LOGS: '/admin/audit-logs'
    },
    // Reporting endpoints
    REPORTS: {
        REVENUE: '/reports/revenue',
        OCCUPANCY: '/reports/occupancy',
        GUESTS: '/reports/guests'
    }
};
// Cache Keys
exports.CACHE_KEYS = {
    ROOM_AVAILABILITY: (checkin, checkout, typeId) => `room_availability:${checkin}:${checkout}:${typeId || 'all'}`,
    ROOM_DETAILS: (roomId) => `room:${roomId}`,
    USER_SESSION: (userId) => `user_session:${userId}`,
    PROMOTION: (code) => `promotion:${code}`,
    REPORT_REVENUE: (from, to) => `report:revenue:${from}:${to}`,
    REPORT_OCCUPANCY: (from, to) => `report:occupancy:${from}:${to}`
};
// Cache TTL (Time To Live) in seconds
exports.CACHE_TTL = {
    ROOM_AVAILABILITY: 60, // 1 minute
    ROOM_DETAILS: 300, // 5 minutes
    USER_SESSION: 1800, // 30 minutes
    PROMOTION: 3600, // 1 hour
    REPORT_REVENUE: 900, // 15 minutes
    REPORT_OCCUPANCY: 900 // 15 minutes
};
// Rate Limiting
exports.RATE_LIMITS = {
    DEFAULT: {
        windowMs: 5 * 60 * 1000, // 5 minutes
        max: 100 // requests per window
    },
    AUTH: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5 // login attempts per window
    },
    WEBHOOK: {
        windowMs: 60 * 1000, // 1 minute
        max: 1000 // webhook calls per minute
    },
    SEARCH: {
        windowMs: 60 * 1000, // 1 minute
        max: 30 // search requests per minute
    }
};
// Business Rules
exports.BUSINESS_RULES = {
    MIN_BOOKING_DAYS: 1,
    MAX_BOOKING_DAYS: 30,
    ADVANCE_BOOKING_DAYS: 365,
    CANCELLATION_HOURS: 24,
    CHECKIN_TIME: '15:00',
    CHECKOUT_TIME: '11:00',
    MAX_GUESTS_PER_ROOM: 6,
    MIN_GUEST_AGE: 18
};
// Payment Providers
exports.PAYMENT_PROVIDERS = {
    STRIPE: 'stripe',
    PAYPAL: 'paypal',
    CASH: 'cash'
};
// Notification Types
exports.NOTIFICATION_TYPES = {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push'
};
// Event Types for Message Queue
exports.EVENT_TYPES = {
    BOOKING_CREATED: 'booking.created',
    BOOKING_CONFIRMED: 'booking.confirmed',
    BOOKING_CANCELLED: 'booking.cancelled',
    BOOKING_CHECKED_IN: 'booking.checked_in',
    BOOKING_CHECKED_OUT: 'booking.checked_out',
    PAYMENT_SUCCEEDED: 'payment.succeeded',
    PAYMENT_FAILED: 'payment.failed',
    PAYMENT_REFUNDED: 'payment.refunded',
    ROOM_STATUS_CHANGED: 'room.status_changed',
    PROMOTION_CREATED: 'promotion.created',
    USER_REGISTERED: 'user.registered'
};
// HTTP Status Codes
exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
};
// Environment
exports.ENVIRONMENTS = {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production'
};
// Log Levels
exports.LOG_LEVELS = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug'
};
//# sourceMappingURL=constants.js.map