/* eslint-disable new-cap */
import NextAuth, {NextAuthOptions, Session, SignInEventMessage, User} from 'next-auth';
import {TypeORM} from 'next-auth/adapters';
import Providers from 'next-auth/providers';

import {AUTH_DB} from '../../../src/api-def/models';
import {AuthPath} from '../../../src/api-def/paths';
import {UserModel} from '../../../src/models/user';
import {ensureIndex} from '../../../src/utils/auth';


let DATABASE_URL = process.env.AUTH_DATABASE_URL;
if (!DATABASE_URL && !process.env.CI) {
  console.error('Specify `AUTH_DATABASE_URL` in env vars for next-auth database.');
  process.exit(1);
}
DATABASE_URL = `${DATABASE_URL}${AUTH_DB}`;

const nextAuthOptions: NextAuthOptions = {
  // Services
  // - https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Providers.Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Providers.Twitch({
      clientId: process.env.AUTH_TWITCH_ID,
      clientSecret: process.env.AUTH_TWITCH_SECRET,
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
    redirect: async (url: string, baseUrl: string): Promise<string> => {
      if (url.startsWith('/')) {
        // Allow relative path redirection
        return url;
      }

      if (url.startsWith(baseUrl)) {
        // Allow same-origin redirection
        return url;
      }

      // Don't return `url` as the callback URL could be cross-origin, which should be disallowed
      return baseUrl;
    },
  },

  // UI customizations
  pages: {
    signIn: AuthPath.SIGN_IN,
  },
};

export default NextAuth(nextAuthOptions);
