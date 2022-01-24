// https://github.com/nextauthjs/next-auth/issues/3665
export type NextAuthErrorType =
  'Signin' |
  'OAuthSignin' |
  'OAuthCallback' |
  'OAuthCreateAccount' |
  'EmailCreateAccount' |
  'Callback' |
  'OAuthAccountNotLinked' |
  'EmailSignin' |
  'CredentialsSignin' |
  'SessionRequired';
