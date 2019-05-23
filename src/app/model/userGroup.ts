export class UserGroup {
  userGroupId: number;
  name: string
  description: string

  constructor(name: string, description: string, userGroupId?: number) {
    this.name = name;
    this.description = description;
    this.userGroupId = userGroupId;
  }
}
