import 'next-auth';

module 'next-auth' {
  interface User {
    id: number;
  }

  interface Session {
    user: User,
  }
}
