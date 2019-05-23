import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserGroup} from "../model/userGroup";

@Injectable()
export class UserGroupService {

  public ADD_GET_USER_GROUP: string;

  constructor(private http: HttpClient) {
    this.ADD_GET_USER_GROUP = '/rest/add-get-user-group';
  }

  public getUserGroups(): Observable<UserGroup []> {
    return this.http.get <UserGroup[]>(this.ADD_GET_USER_GROUP);
  }

  public addUserGroup(userGroup: UserGroup) {
    return this.http.post(this.ADD_GET_USER_GROUP, userGroup);
  }
}
