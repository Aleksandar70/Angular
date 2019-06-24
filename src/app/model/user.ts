import {UserGroup} from './userGroup';
import {UserManager} from './user-manager';

export class User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  userGroup: UserGroup;
  userManager: UserManager;
  token: string;

  constructor(username: string,
              password: string,
              userGroup?: UserGroup,
              firstName?: string,
              lastName?: string,
              userManager?: UserManager,
              token?: string) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userGroup = userGroup;
    this.userManager = userManager;
    this.token = token;
  }
}
