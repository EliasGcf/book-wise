import NextAuth from 'next-auth';

import { nextAuthOptions } from '@libs/next-auth';

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
