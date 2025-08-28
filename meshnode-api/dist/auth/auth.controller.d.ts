import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            email: string;
        };
    }>;
    login(req: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: any;
    }>;
}
