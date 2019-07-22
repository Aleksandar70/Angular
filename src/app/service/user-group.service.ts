import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserGroupDto} from '../model/userGroupDto';
import {UserManagerDto} from '../model/user-manager';

@Injectable()
export class UserGroupService {

  public ADD_GET_USER_GROUP: string;
  public GET_USER_MANAGERS: string;
  user;

  constructor(private http: HttpClient) {
    this.ADD_GET_USER_GROUP = 'http://localhost:8080/add-get-user-group';
    this.GET_USER_MANAGERS = 'http://localhost:8080/get-user-managers';
  }

  public getUserGroups(): Observable<UserGroupDto []> {
    return this.http.get <UserGroupDto[]>(this.ADD_GET_USER_GROUP);
  }

  public addUserGroup(userGroup: UserGroupDto) {
    if (userGroup.name !== '' && userGroup.description !== '') {
      return this.http.post(this.ADD_GET_USER_GROUP, userGroup);
    }
  }

  public getUserManagers(): Observable<UserManagerDto []> {
    return this.http.get <UserManagerDto[]>(this.GET_USER_MANAGERS);
  }
}
