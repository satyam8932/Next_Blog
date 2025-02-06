// Run this script to create an admin user
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('LesExpats2025$', 12);
    
    await prisma.user.upsert({
        where: { email: 'admin@metaexpat.com' },
        update: {},
        create: {
            email: 'admin@metaexpat.com',
            name: 'Admin User',
            password,
            isAdmin: true,
        },
    });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());