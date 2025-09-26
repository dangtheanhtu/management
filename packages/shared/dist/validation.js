"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customValidationRules = exports.idParamSchema = exports.reportQuerySchema = exports.dateRangeSchema = exports.paginationSchema = exports.promotionUpdateSchema = exports.promotionCreateSchema = exports.paymentRefundSchema = exports.paymentCreateSchema = exports.bookingStatusUpdateSchema = exports.bookingUpdateSchema = exports.bookingCreateSchema = exports.roomUpdateSchema = exports.roomCreateSchema = exports.roomTypeCreateSchema = exports.roomSearchSchema = exports.userUpdateSchema = exports.userLoginSchema = exports.userRegistrationSchema = void 0;
exports.validate = validate;
exports.validateAsync = validateAsync;
const joi_1 = __importDefault(require("joi"));
// User validation schemas
exports.userRegistrationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .required()
        .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    first_name: joi_1.default.string().min(2).max(50).optional(),
    last_name: joi_1.default.string().min(2).max(50).optional(),
    phone: joi_1.default.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional(),
});
exports.userLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.userUpdateSchema = joi_1.default.object({
    first_name: joi_1.default.string().min(2).max(50).optional(),
    last_name: joi_1.default.string().min(2).max(50).optional(),
    phone: joi_1.default.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional(),
});
// Room validation schemas
exports.roomSearchSchema = joi_1.default.object({
    checkin_date: joi_1.default.date().iso().required(),
    checkout_date: joi_1.default.date().iso().greater(joi_1.default.ref('checkin_date')).required(),
    room_type_id: joi_1.default.number().integer().positive().optional(),
    guest_count: joi_1.default.number().integer().min(1).max(6).optional(),
    min_price: joi_1.default.number().positive().optional(),
    max_price: joi_1.default.number().positive().min(joi_1.default.ref('min_price')).optional(),
    amenities: joi_1.default.array().items(joi_1.default.string()).optional(),
});
exports.roomTypeCreateSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    base_price: joi_1.default.number().positive().required(),
    description: joi_1.default.string().max(500).optional(),
    max_occupancy: joi_1.default.number().integer().min(1).max(6).required(),
    amenities: joi_1.default.array().items(joi_1.default.string()).optional(),
});
exports.roomCreateSchema = joi_1.default.object({
    number: joi_1.default.string().min(3).max(10).required(),
    type_id: joi_1.default.number().integer().positive().required(),
    floor: joi_1.default.number().integer().min(1).max(50).required(),
    view_type: joi_1.default.string().max(50).optional(),
});
exports.roomUpdateSchema = joi_1.default.object({
    status: joi_1.default.string()
        .valid('available', 'occupied', 'cleaning', 'maintenance')
        .optional(),
    view_type: joi_1.default.string().max(50).optional(),
});
// Booking validation schemas
exports.bookingCreateSchema = joi_1.default.object({
    room_id: joi_1.default.number().integer().positive().required(),
    checkin_date: joi_1.default.date().iso().min('now').required(),
    checkout_date: joi_1.default.date().iso().greater(joi_1.default.ref('checkin_date')).required(),
    guest_count: joi_1.default.number().integer().min(1).max(6).required(),
    special_requests: joi_1.default.string().max(500).optional(),
    promotion_code: joi_1.default.string().max(20).optional(),
});
exports.bookingUpdateSchema = joi_1.default.object({
    checkin_date: joi_1.default.date().iso().optional(),
    checkout_date: joi_1.default.date().iso().greater(joi_1.default.ref('checkin_date')).optional(),
    guest_count: joi_1.default.number().integer().min(1).max(6).optional(),
    special_requests: joi_1.default.string().max(500).optional(),
});
exports.bookingStatusUpdateSchema = joi_1.default.object({
    status: joi_1.default.string()
        .valid('pending', 'confirmed', 'cancelled', 'checked_in', 'checked_out')
        .required(),
});
// Payment validation schemas
exports.paymentCreateSchema = joi_1.default.object({
    booking_id: joi_1.default.number().integer().positive().required(),
    amount: joi_1.default.number().positive().required(),
    currency: joi_1.default.string().length(3).uppercase().default('USD'),
    payment_method_id: joi_1.default.string().required(),
});
exports.paymentRefundSchema = joi_1.default.object({
    amount: joi_1.default.number().positive().optional(),
    reason: joi_1.default.string().max(200).optional(),
});
// Promotion validation schemas
exports.promotionCreateSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    code: joi_1.default.string().min(3).max(20).uppercase().optional(),
    discount_percent: joi_1.default.number().min(0).max(100).optional(),
    discount_amount: joi_1.default.number().positive().optional(),
    min_booking_amount: joi_1.default.number().min(0).default(0),
    max_discount_amount: joi_1.default.number().positive().optional(),
    starts_at: joi_1.default.date().iso().min('now').required(),
    ends_at: joi_1.default.date().iso().greater(joi_1.default.ref('starts_at')).required(),
    usage_limit: joi_1.default.number().integer().positive().optional(),
})
    .custom((value, helpers) => {
    if (!value.discount_percent && !value.discount_amount) {
        return helpers.error('custom.discountRequired');
    }
    return value;
})
    .messages({
    'custom.discountRequired': 'Either discount_percent or discount_amount must be provided',
});
exports.promotionUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).optional(),
    discount_percent: joi_1.default.number().min(0).max(100).optional(),
    discount_amount: joi_1.default.number().positive().optional(),
    min_booking_amount: joi_1.default.number().min(0).optional(),
    max_discount_amount: joi_1.default.number().positive().optional(),
    starts_at: joi_1.default.date().iso().optional(),
    ends_at: joi_1.default.date().iso().optional(),
    active: joi_1.default.boolean().optional(),
    usage_limit: joi_1.default.number().integer().positive().optional(),
});
// Query parameter validation schemas
exports.paginationSchema = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    limit: joi_1.default.number().integer().min(1).max(100).default(20),
    sort_by: joi_1.default.string().optional(),
    sort_order: joi_1.default.string().valid('asc', 'desc').default('desc'),
});
exports.dateRangeSchema = joi_1.default.object({
    from: joi_1.default.date().iso().required(),
    to: joi_1.default.date().iso().greater(joi_1.default.ref('from')).required(),
});
exports.reportQuerySchema = joi_1.default.object({
    from: joi_1.default.date().iso().required(),
    to: joi_1.default.date().iso().greater(joi_1.default.ref('from')).required(),
    group_by: joi_1.default.string().valid('day', 'week', 'month', 'year').default('day'),
    room_type_id: joi_1.default.number().integer().positive().optional(),
});
// ID parameter validation
exports.idParamSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().required(),
});
// Generic validation function
function validate(schema, data) {
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
        const errorMessage = error.details
            .map((detail) => detail.message)
            .join(', ');
        throw new Error(`Validation error: ${errorMessage}`);
    }
    return value;
}
// Async validation function
async function validateAsync(schema, data) {
    try {
        const value = await schema.validateAsync(data, { abortEarly: false });
        return value;
    }
    catch (err) {
        // Joi throws on validateAsync; err is a ValidationError
        const error = err;
        const errorMessage = (error.details ?? [])
            .map((detail) => detail.message)
            .join(', ');
        throw new Error(`Validation error: ${errorMessage || (error.message ?? 'Unknown error')}`);
    }
}
// Custom validation rules
exports.customValidationRules = {
    // Check if user has permission
    hasPermission: (permission) => (value, helpers) => {
        // Implement actual permission checking here if needed
        return value;
    },
    // Check if room is available
    roomAvailable: (roomId, checkinDate, checkoutDate) => (value, helpers) => {
        // Implement actual availability checking here
        return value;
    },
    // Check if promotion is valid
    validPromotion: (code) => (value, helpers) => {
        // Implement actual promotion validation here
        return value;
    },
};
//# sourceMappingURL=validation.js.map