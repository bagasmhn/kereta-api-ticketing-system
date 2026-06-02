import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    } | null>;
    update(id: string, dto: any): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllAdmin(): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
}
