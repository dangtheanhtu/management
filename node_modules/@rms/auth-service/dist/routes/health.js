"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const shared_1 = require("@rms/shared");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const requestId = req.headers['x-request-id'] || (0, shared_1.generateRequestId)();
    try {
        // Check database connection
        await database_1.dbPool.query('SELECT 1');
        // Check Redis connection
        await database_1.redisClient.ping();
        res.json({
            success: true,
            data: {
                service: 'auth-service',
                status: 'healthy',
                timestamp: new Date().toISOString(),
                database: 'connected',
                redis: 'connected'
            },
            request_id: requestId
        });
    }
    catch (error) {
        res.status(503).json({
            success: false,
            error: 'Service unhealthy',
            data: {
                service: 'auth-service',
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            request_id: requestId
        });
    }
});
exports.default = router;
//# sourceMappingURL=health.js.map