import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            email: string;
            name?: string;
            isAdmin: boolean;
        } & DefaultSession['user']
    }

    interface User extends DefaultUser {
        id: string;
        email: string;
        name?: string;
        isAdmin: boolean;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        email: string;
        isAdmin: boolean;
    }
}