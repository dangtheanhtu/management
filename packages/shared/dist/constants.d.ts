export declare const ROLES: {
    readonly GUEST: "guest";
    readonly RECEPTIONIST: "receptionist";
    readonly MANAGER: "manager";
};
export declare const PERMISSIONS: {
    readonly CREATE_BOOKING: "create_booking";
    readonly READ_OWN_BOOKINGS: "read_own_bookings";
    readonly READ_ALL_BOOKINGS: "read_all_bookings";
    readonly UPDATE_BOOKING: "update_booking";
    readonly CANCEL_BOOKING: "cancel_booking";
    readonly READ_ROOMS: "read_rooms";
    readonly UPDATE_ROOM_PRICE: "update_room_price";
    readonly UPDATE_ROOM_STATUS: "update_room_status";
    readonly CREATE_PAYMENT: "create_payment";
    readonly READ_PAYMENTS: "read_payments";
    readonly PROCESS_REFUND: "process_refund";
    readonly CHECK_IN: "check_in";
    readonly CHECK_OUT: "check_out";
    readonly UPDATE_HOUSEKEEPING: "update_housekeeping";
    readonly MANAGE_PROMOTIONS: "manage_promotions";
    readonly VIEW_REPORTS: "view_reports";
    readonly MANAGE_USERS: "manage_users";
    readonly VIEW_AUDIT_LOGS: "view_audit_logs";
};
export declare const ROLE_PERMISSIONS: {
    readonly guest: readonly ["create_booking", "read_own_bookings", "read_rooms", "create_payment"];
    readonly receptionist: readonly ["read_all_bookings", "update_booking", "cancel_booking", "read_rooms", "update_room_status", "read_payments", "check_in", "check_out", "update_housekeeping"];
    readonly manager: readonly ("create_booking" | "read_own_bookings" | "read_all_bookings" | "update_booking" | "cancel_booking" | "read_rooms" | "update_room_price" | "update_room_status" | "create_payment" | "read_payments" | "process_refund" | "check_in" | "check_out" | "update_housekeeping" | "manage_promotions" | "view_reports" | "manage_users" | "view_audit_logs")[];
};
export declare const API_ENDPOINTS: {
    readonly AUTH: {
        readonly SIGNUP: "/auth/signup";
        readonly LOGIN: "/auth/login";
        readonly LOGOUT: "/auth/logout";
        readonly ME: "/auth/me";
        readonly REFRESH: "/auth/refresh";
    };
    readonly ROOMS: {
        readonly LIST: "/rooms";
        readonly AVAILABILITY: "/rooms/availability";
        readonly DETAILS: "/rooms/:id";
        readonly UPDATE_PRICE: "/admin/rooms/:id/price";
        readonly UPDATE_STATUS: "/ops/housekeeping/:roomId/status";
    };
    readonly BOOKINGS: {
        readonly CREATE: "/bookings";
        readonly LIST: "/bookings";
        readonly DETAILS: "/bookings/:id";
        readonly CANCEL: "/bookings/:id/cancel";
        readonly MY_BOOKINGS: "/bookings/my";
    };
    readonly PAYMENTS: {
        readonly CREATE: "/payments/:bookingId/pay";
        readonly WEBHOOK: "/payments/webhook";
        readonly REFUND: "/payments/:bookingId/refund";
    };
    readonly OPS: {
        readonly CHECKIN: "/ops/checkin/:bookingId";
        readonly CHECKOUT: "/ops/checkout/:bookingId";
    };
    readonly ADMIN: {
        readonly PROMOTIONS: "/admin/promotions";
        readonly USERS: "/admin/users";
        readonly AUDIT_LOGS: "/admin/audit-logs";
    };
    readonly REPORTS: {
        readonly REVENUE: "/reports/revenue";
        readonly OCCUPANCY: "/reports/occupancy";
        readonly GUESTS: "/reports/guests";
    };
};
export declare const CACHE_KEYS: {
    readonly ROOM_AVAILABILITY: (checkin: string, checkout: string, typeId?: number) => string;
    readonly ROOM_DETAILS: (roomId: number) => string;
    readonly USER_SESSION: (userId: number) => string;
    readonly PROMOTION: (code: string) => string;
    readonly REPORT_REVENUE: (from: string, to: string) => string;
    readonly REPORT_OCCUPANCY: (from: string, to: string) => string;
};
export declare const CACHE_TTL: {
    readonly ROOM_AVAILABILITY: 60;
    readonly ROOM_DETAILS: 300;
    readonly USER_SESSION: 1800;
    readonly PROMOTION: 3600;
    readonly REPORT_REVENUE: 900;
    readonly REPORT_OCCUPANCY: 900;
};
export declare const RATE_LIMITS: {
    readonly DEFAULT: {
        readonly windowMs: number;
        readonly max: 100;
    };
    readonly AUTH: {
        readonly windowMs: number;
        readonly max: 5;
    };
    readonly WEBHOOK: {
        readonly windowMs: number;
        readonly max: 1000;
    };
    readonly SEARCH: {
        readonly windowMs: number;
        readonly max: 30;
    };
};
export declare const BUSINESS_RULES: {
    readonly MIN_BOOKING_DAYS: 1;
    readonly MAX_BOOKING_DAYS: 30;
    readonly ADVANCE_BOOKING_DAYS: 365;
    readonly CANCELLATION_HOURS: 24;
    readonly CHECKIN_TIME: "15:00";
    readonly CHECKOUT_TIME: "11:00";
    readonly MAX_GUESTS_PER_ROOM: 6;
    readonly MIN_GUEST_AGE: 18;
};
export declare const PAYMENT_PROVIDERS: {
    readonly STRIPE: "stripe";
    readonly PAYPAL: "paypal";
    readonly CASH: "cash";
};
export declare const NOTIFICATION_TYPES: {
    readonly EMAIL: "email";
    readonly SMS: "sms";
    readonly PUSH: "push";
};
export declare const EVENT_TYPES: {
    readonly BOOKING_CREATED: "booking.created";
    readonly BOOKING_CONFIRMED: "booking.confirmed";
    readonly BOOKING_CANCELLED: "booking.cancelled";
    readonly BOOKING_CHECKED_IN: "booking.checked_in";
    readonly BOOKING_CHECKED_OUT: "booking.checked_out";
    readonly PAYMENT_SUCCEEDED: "payment.succeeded";
    readonly PAYMENT_FAILED: "payment.failed";
    readonly PAYMENT_REFUNDED: "payment.refunded";
    readonly ROOM_STATUS_CHANGED: "room.status_changed";
    readonly PROMOTION_CREATED: "promotion.created";
    readonly USER_REGISTERED: "user.registered";
};
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly TOO_MANY_REQUESTS: 429;
    readonly INTERNAL_SERVER_ERROR: 500;
    readonly BAD_GATEWAY: 502;
    readonly SERVICE_UNAVAILABLE: 503;
};
export declare const ENVIRONMENTS: {
    readonly DEVELOPMENT: "development";
    readonly STAGING: "staging";
    readonly PRODUCTION: "production";
};
export declare const LOG_LEVELS: {
    readonly ERROR: "error";
    readonly WARN: "warn";
    readonly INFO: "info";
    readonly DEBUG: "debug";
};
//# sourceMappingURL=constants.d.ts.map