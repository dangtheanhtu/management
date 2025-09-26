import { Request, Response, NextFunction } from 'express';
export declare function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function notFoundHandler(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=errorHandler.d.ts.map