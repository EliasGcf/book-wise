import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { AuthOptions, getServerSession as getSS } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { prisma } from '@libs/prisma';

export const nextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma as unknown as PrismaClient),
  providers: [
    GithubProvider({
      clientId: String(process.env.OAUTH_GITHUB_ID),
      clientSecret: String(process.env.OAUTH_GITHUB_SECRET),
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...user,
          createdAt: String(user.createdAt),
        },
      };
    },
  },
};

export function getServerSession() {
  return getSS(nextAuthOptions);
}
