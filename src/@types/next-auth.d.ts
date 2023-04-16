import { User } from '@prisma/client';

declare module 'next-auth' {
  export interface Session {
    user: User;
  }
}
