import {User as ApiUser} from '../../src/api-def/models';


// Must use interface here
module 'next-auth' {
  interface User extends ApiUser {}

  interface Session {
    user: User,
  }
}
