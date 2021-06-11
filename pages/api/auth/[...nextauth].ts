/* eslint-disable new-cap */
import NextAuth, {NextAuthOptions, Session, User} from 'next-auth';
import Providers from 'next-auth/providers';


const nextAuthOptions: NextAuthOptions = {
  // More providers available
  // Check https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  // Connect to database for storing customized user data
  database: process.env.AUTH_DATABASE_URL,

  // Auth session encryption key
  secret: process.env.AUTH_SECRET,

  callbacks: {
    // Attach user ID to session
    // - Type augmented at `types/next-auth/index.d.ts`
    session: async (session: Session, user: User): Promise<Session> => {
      session.user.id = user.id;

      return session;
    },
  },

  theme: 'dark',
};

export default NextAuth(nextAuthOptions);
