import {MongoDBAdapter as nextAuthMongoDBAdapter} from '@next-auth/mongodb-adapter';
import env from 'env-var';
import NextAuth, {NextAuthOptions, Session} from 'next-auth';
import {Awaitable} from 'next-auth/core/types';
import nextAuthDiscordProvider from 'next-auth/providers/discord';
import nextAuthGitHubProvider from 'next-auth/providers/github';
import nextAuthGoogleProvider from 'next-auth/providers/google';
import nextAuthTwitchProvider from 'next-auth/providers/twitch';

import {AUTH_DB} from '../../../src/api-def/models/user';
import {AuthPath} from '../../../src/api-def/paths';
import {ensureIndex} from '../../../src/utils/auth';
import {generateMongoClient} from '../../../src/utils/db/client';


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

  // Database connection
  adapter: nextAuthMongoDBAdapter(generateMongoClient(AUTH_DB).connect()),

  // Security
  secret: env.get('AUTH_SECRET').required().asString(),

  // Event hooks
  events: {
    signIn: async ({isNewUser}) => {
      if (!isNewUser) {
        return;
      }

      await ensureIndex();
    },
  },

  callbacks: {
    // Re-assign `user` to ensure `user` from the database is used in `session`
    // - Type augmented at `types/next-auth/index.d.ts`
    session: ({session, user}): Awaitable<Session> => {
      session.user = user;

      return session;
    },
    redirect: ({url, baseUrl}): Awaitable<string> => {
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

// eslint-disable-next-line new-cap
export default NextAuth(nextAuthOptions);
