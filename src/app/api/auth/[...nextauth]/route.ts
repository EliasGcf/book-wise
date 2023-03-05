import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: String(process.env.OAUTH_GITHUB_ID),
      clientSecret: String(process.env.OAUTH_GITHUB_SECRET),
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.JWT_SECRET,
});

export { handler as GET, handler as POST };
