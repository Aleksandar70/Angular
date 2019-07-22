export class UserManagerDto {
  userManagerId: number;
  userManagerName: string;

  constructor(userManagerId: number, userManagerName: string) {
    this.userManagerId = userManagerId;
    this.userManagerName = userManagerName;
  }
}
