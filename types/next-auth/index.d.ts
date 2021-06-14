import {ObjectId} from 'mongodb';


// Must use interface here
module 'next-auth' {
  interface User {
    id: ObjectId,
    createdAt: Date,
    updatedAt: Date,
    isAdmin: boolean,
    adsFreeExpiry?: Date,
  }

  interface Session {
    user: User,
  }
}
