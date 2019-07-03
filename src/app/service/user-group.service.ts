import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserGroup} from '../model/userGroup';
import {UserManager} from '../model/user-manager';

@Injectable()
export class UserGroupService {

  public ADD_GET_USER_GROUP: string;
  public GET_USER_MANAGERS: string;
  userGroups: Observable<UserGroup[]>;
  user;

  constructor(private http: HttpClient) {
    this.ADD_GET_USER_GROUP = 'http://localhost:8080/add-get-user-group';
    this.GET_USER_MANAGERS = 'http://localhost:8080/get-user-managers';
  }

  public getUserGroups(): Observable<UserGroup []> {
    return this.http.get <UserGroup[]>(this.ADD_GET_USER_GROUP);
  }

  public addUserGroup(userGroup: UserGroup) {
    if (userGroup.name !== '' && userGroup.description !== '') {
      return this.http.post(this.ADD_GET_USER_GROUP, userGroup);
    }
  }

  public getUserManagers(): Observable<UserManager []> {
    return this.http.get <UserManager[]>(this.GET_USER_MANAGERS);
  }

  public deleteUserGroup(index: number) {
    this.userGroups = this.getUserGroups();
    // return this.http.delete();
  }
}
