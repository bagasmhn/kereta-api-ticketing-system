import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    } | null>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    } | null>;
    findAll(): Promise<{
        id: number;
        email: string;
        name: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    findAllAdmin(): Promise<{
        id: number;
        email: string;
        name: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    update(id: number, data: any): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
