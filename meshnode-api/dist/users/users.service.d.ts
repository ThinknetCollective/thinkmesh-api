import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(username: string, email: string, password: string): Promise<User>;
    findByUsername(username: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
}
