import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: String(process.env.OAUTH_GITHUB_ID),
      clientSecret: String(process.env.OAUTH_GITHUB_SECRET),
      checks: ['pkce'],
    }),
  ],
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
