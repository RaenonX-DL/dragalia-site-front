/* eslint-disable import/no-named-as-default-member */
import Adapters from 'next-auth/adapters';
import {EntitySchemaOptions} from 'typeorm/entity-schema/EntitySchemaOptions';


/**
 * User data class for next-auth.
 *
 * @see https://github.com/nextauthjs/next-auth/issues/861 the usage of `any` in inheritance
 */
class User extends (<any>Adapters.TypeORM.Models.User.model) {
  isAdmin: boolean;

  /**
   * @inheritDoc
   */
  constructor(name: string, email: string, image: string, emailVerified: Date | undefined) {
    // Casting `Adapters.TypeORM.Models.User.model` to `any` causes `super()` to be invalid
    // eslint-disable-next-line constructor-super
    super(name, email, image, emailVerified);

    // Set default value
    this.isAdmin = false;
  }
}

const UserSchema: EntitySchemaOptions<User> = {
  name: 'User',
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    // CAUTION: Remember to update `types/next-auth/index.d.ts` for type definitions
    isAdmin: {
      type: 'boolean',
      default: false,
    },
    adsFreeExpiry: {
      type: 'date',
      nullable: true,
    },
  },
};

export const UserModel = {
  model: User,
  schema: UserSchema,
  name: UserSchema.name,
};
