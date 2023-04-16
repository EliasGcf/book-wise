import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions, getServerSession as getSS } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { prisma } from '@libs/prisma';

export const nextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
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
      return { ...session, user };
    },
  },
};

export function getServerSession() {
  return getSS(nextAuthOptions);
}
