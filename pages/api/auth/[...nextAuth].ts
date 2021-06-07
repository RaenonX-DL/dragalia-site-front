/* eslint-disable new-cap */
import NextAuth, {Session, User} from 'next-auth';
import {Awaitable} from 'next-auth/internals/utils';
import Providers from 'next-auth/providers';


const nextAuthApp = NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  database: process.env.AUTH_DATABASE_URL,

  callbacks: {
    session: (session: Session, user: User): Awaitable<Session> => {
      session.user.id = user.id;

      return Promise.resolve(session);
    },
  },

  theme: 'dark',
});

export default nextAuthApp;
