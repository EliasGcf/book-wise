import { User as PrismaUser } from '@prisma/client';

declare module 'next-auth' {
  export interface User extends PrismaUser {
    createdAt: string;
  }

  export interface Session {
    user: User;
  }

  export type AdapterUser = PrismaUser;
}
