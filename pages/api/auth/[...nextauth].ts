/* eslint-disable new-cap */
import NextAuth, {NextAuthOptions, Session, SignInEventMessage, User} from 'next-auth';
import {TypeORM} from 'next-auth/adapters';
import Providers from 'next-auth/providers';

import {UserModel} from '../../../src/models/user';
import {ensureIndex} from '../../../src/utils/auth';


const DATABASE_URL = process.env.AUTH_DATABASE_URL;
if (!DATABASE_URL) {
  console.error('Specify `AUTH_DATABASE_URL` in env vars for next-auth database.');
  process.exit(1);
}

const nextAuthOptions: NextAuthOptions = {
  // Services
  // - https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hrs
  },

  // Database connection managements
  database: DATABASE_URL,

  adapter: TypeORM.Adapter(
    DATABASE_URL,
    {
      // Other models still working as expected
      // - `typeorm-legacy-adapter` does not allow type augmentation
      // @ts-ignore
      models: {
        User: UserModel,
      },
    },
  ),

  // Security
  secret: process.env.AUTH_SECRET,

  // Event hooks
  events: {
    signIn: async (message: SignInEventMessage) => {
      if (!message.isNewUser) {
        return;
      }

      await ensureIndex();
    },
  },

  callbacks: {
    // Re-assign `user` to ensure `user` from the database is used in `session`
    // - Type augmented at `types/next-auth/index.d.ts`
    session: async (session: Session, user: User): Promise<Session> => {
      session.user = user;

      return session;
    },
  },

  // UI customizations
  theme: 'dark',
};

export default NextAuth(nextAuthOptions);
