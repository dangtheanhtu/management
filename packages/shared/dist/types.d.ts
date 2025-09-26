export interface User {
    id: number;
    email: string;
    role: UserRole;
    first_name?: string;
    last_name?: string;
    phone?: string;
    created_at: Date;
    updated_at: Date;
}
export type UserRole = 'guest' | 'receptionist' | 'manager';
export interface RoomType {
    id: number;
    name: string;
    base_price: number;
    description?: string;
    max_occupancy: number;
    amenities: string[];
    created_at: Date;
    updated_at: Date;
}
export interface Room {
    id: number;
    number: string;
    type_id: number;
    status: RoomStatus;
    floor: number;
    view_type?: string;
    created_at: Date;
    updated_at: Date;
}
export type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance';
export interface Booking {
    id: number;
    user_id: number;
    room_id: number;
    checkin_date: string;
    checkout_date: string;
    status: BookingStatus;
    total_amount: number;
    guest_count: number;
    special_requests?: string;
    created_at: Date;
    updated_at: Date;
}
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out';
export interface Payment {
    id: number;
    booking_id: number;
    amount: number;
    currency: string;
    provider: string;
    status: PaymentStatus;
    txn_id?: string;
    provider_response?: any;
    created_at: Date;
    updated_at: Date;
}
export type PaymentStatus = 'initiated' | 'succeeded' | 'failed' | 'refunded';
export interface Promotion {
    id: number;
    name: string;
    code?: string;
    discount_percent?: number;
    discount_amount?: number;
    min_booking_amount: number;
    max_discount_amount?: number;
    starts_at: Date;
    ends_at: Date;
    active: boolean;
    usage_limit?: number;
    used_count: number;
    created_at: Date;
    updated_at: Date;
}
export interface AuditLog {
    id: number;
    actor_user_id?: number;
    action: string;
    entity: string;
    entity_id: number;
    payload_json?: any;
    ip_address?: string;
    user_agent?: string;
    created_at: Date;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    request_id?: string;
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
}
export interface RoomSearchParams {
    checkin_date: string;
    checkout_date: string;
    room_type_id?: number;
    guest_count?: number;
    min_price?: number;
    max_price?: number;
    amenities?: string[];
}
export interface BookingCreateRequest {
    room_id: number;
    checkin_date: string;
    checkout_date: string;
    guest_count: number;
    special_requests?: string;
    promotion_code?: string;
}
export interface PaymentCreateRequest {
    booking_id: number;
    amount: number;
    currency?: string;
    payment_method_id: string;
}
export interface JwtPayload {
    user_id: number;
    email: string;
    role: UserRole;
    iat?: number;
    exp?: number;
}
export interface ServiceHealth {
    service: string;
    status: 'healthy' | 'unhealthy' | 'degraded';
    timestamp: Date;
    response_time?: number;
    details?: any;
}
export interface Notification {
    id: string;
    type: 'email' | 'sms' | 'push';
    recipient: string;
    subject?: string;
    message: string;
    data?: any;
    status: 'pending' | 'sent' | 'failed';
    created_at: Date;
    sent_at?: Date;
}
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode?: number, isOperational?: boolean);
}
export declare class ValidationError extends AppError {
    constructor(message: string);
}
export declare class AuthenticationError extends AppError {
    constructor(message?: string);
}
export declare class AuthorizationError extends AppError {
    constructor(message?: string);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string);
}
export declare class ConflictError extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=types.d.ts.map