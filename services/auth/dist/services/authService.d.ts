import { User, JwtPayload } from '@rms/shared';
export declare class AuthService {
    registerUser(userData: {
        email: string;
        password: string;
        first_name?: string;
        last_name?: string;
        phone?: string;
    }): Promise<{
        user: Omit<User, 'password_hash'>;
        token: string;
    }>;
    loginUser(email: string, password: string): Promise<{
        user: Omit<User, 'password_hash'>;
        token: string;
    }>;
    getUserById(userId: number): Promise<Omit<User, 'password_hash'> | null>;
    updateUser(userId: number, updateData: {
        first_name?: string;
        last_name?: string;
        phone?: string;
    }): Promise<Omit<User, 'password_hash'>>;
    logoutUser(userId: number, token: string): Promise<void>;
    refreshToken(userId: number): Promise<{
        token: string;
    }>;
    validateToken(token: string): Promise<JwtPayload | null>;
}
//# sourceMappingURL=authService.d.ts.map