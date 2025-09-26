"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.dbPool = void 0;
const pg_1 = require("pg");
const redis_1 = require("redis");
// Database configuration
exports.dbPool = new pg_1.Pool({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DB || 'rms',
    user: process.env.POSTGRES_USER || 'rms_user',
    password: process.env.POSTGRES_PASSWORD || 'rms_password',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
// Redis configuration
exports.redisClient = (0, redis_1.createClient)({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    },
    password: process.env.REDIS_PASSWORD || undefined,
});
// Connect to Redis
exports.redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});
exports.redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
exports.redisClient.connect().catch(console.error);
// Graceful shutdown
process.on('SIGINT', async () => {
    await exports.dbPool.end();
    await exports.redisClient.quit();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    await exports.dbPool.end();
    await exports.redisClient.quit();
    process.exit(0);
});
//# sourceMappingURL=database.js.map