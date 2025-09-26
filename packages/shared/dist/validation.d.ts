import Joi from 'joi';
export declare const userRegistrationSchema: Joi.ObjectSchema<any>;
export declare const userLoginSchema: Joi.ObjectSchema<any>;
export declare const userUpdateSchema: Joi.ObjectSchema<any>;
export declare const roomSearchSchema: Joi.ObjectSchema<any>;
export declare const roomTypeCreateSchema: Joi.ObjectSchema<any>;
export declare const roomCreateSchema: Joi.ObjectSchema<any>;
export declare const roomUpdateSchema: Joi.ObjectSchema<any>;
export declare const bookingCreateSchema: Joi.ObjectSchema<any>;
export declare const bookingUpdateSchema: Joi.ObjectSchema<any>;
export declare const bookingStatusUpdateSchema: Joi.ObjectSchema<any>;
export declare const paymentCreateSchema: Joi.ObjectSchema<any>;
export declare const paymentRefundSchema: Joi.ObjectSchema<any>;
export declare const promotionCreateSchema: Joi.ObjectSchema<any>;
export declare const promotionUpdateSchema: Joi.ObjectSchema<any>;
export declare const paginationSchema: Joi.ObjectSchema<any>;
export declare const dateRangeSchema: Joi.ObjectSchema<any>;
export declare const reportQuerySchema: Joi.ObjectSchema<any>;
export declare const idParamSchema: Joi.ObjectSchema<any>;
export declare function validate<T>(schema: Joi.ObjectSchema, data: unknown): T;
export declare function validateAsync<T>(schema: Joi.ObjectSchema, data: unknown): Promise<T>;
export declare const customValidationRules: {
    hasPermission: (permission: string) => (value: any, helpers: any) => any;
    roomAvailable: (roomId: number, checkinDate: string, checkoutDate: string) => (value: any, helpers: any) => any;
    validPromotion: (code: string) => (value: any, helpers: any) => any;
};
//# sourceMappingURL=validation.d.ts.map