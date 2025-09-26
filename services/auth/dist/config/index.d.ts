export declare const config: {
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    bcrypt: {
        saltRounds: number;
    };
    rateLimit: {
        windowMs: number;
        max: number;
    };
    cors: {
        origin: string;
        credentials: boolean;
    };
    logging: {
        level: string;
        format: string;
    };
};
//# sourceMappingURL=index.d.ts.map