import env from 'env-var';
import NextAuth, {NextAuthOptions, Session, SignInEventMessage, User} from 'next-auth';
import {TypeORM} from 'next-auth/adapters';
import nextAuthDiscordProvider from 'next-auth/providers/discord';
import nextAuthGitHubProvider from 'next-auth/providers/github';
import nextAuthGoogleProvider from 'next-auth/providers/google';
import nextAuthTwitchProvider from 'next-auth/providers/twitch';

import {AUTH_DB} from '../../../src/api-def/models';
import {AuthPath} from '../../../src/api-def/paths';
import {isCi} from '../../../src/api-def/utils';
import {UserModel} from '../../../src/models/user';
import {ensureIndex} from '../../../src/utils/auth';


let DATABASE_URL = env.get('AUTH_DATABASE_URL')
  .required(!isCi())
  .example('mongodb://localhost:27017/')
  .asString();

DATABASE_URL = `${DATABASE_URL}${AUTH_DB}`;

const nextAuthOptions: NextAuthOptions = {
  // Services
  // - https://next-auth.js.org/configuration/providers
  providers: [
    nextAuthGoogleProvider({
      clientId: env.get('AUTH_GOOGLE_ID').required().asString(),
      clientSecret: env.get('AUTH_GOOGLE_SECRET').required().asString(),
    }),
    nextAuthDiscordProvider({
      clientId: env.get('AUTH_DISCORD_ID').required().asString(),
      clientSecret: env.get('AUTH_DISCORD_SECRET').required().asString(),
    }),
    nextAuthGitHubProvider({
      clientId: env.get('AUTH_GITHUB_ID').required().asString(),
      clientSecret: env.get('AUTH_GITHUB_SECRET').required().asString(),
    }),
    nextAuthTwitchProvider({
      clientId: env.get('AUTH_TWITCH_ID').required().asString(),
      clientSecret: env.get('AUTH_TWITCH_SECRET').required().asString(),
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
  secret: env.get('AUTH_SECRET').required().asString(),

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
