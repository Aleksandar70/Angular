import {UserGroup} from "./userGroup";

export class User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  userGroup: UserGroup;

  constructor(username: string, password: string, userGroup?: UserGroup, firstName?: string, lastName?: string,) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userGroup = userGroup;
  }
}
