import {UserGroupDto} from './userGroupDto';
import {UserManagerDto} from './user-manager';

export class UserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  userGroupDto: UserGroupDto;
  userManagerDto: UserManagerDto;
  token: string;

  constructor(username: string,
              password: string,
              userGroup?: UserGroupDto,
              firstName?: string,
              lastName?: string,
              userManagerDto?: UserManagerDto,
              token?: string) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userGroupDto = userGroup;
    this.userManagerDto = userManagerDto;
    this.token = token;
  }
}
