import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {UserGroup} from '../model/userGroup';

@Injectable()
export class UserService {
  user: User;
  public URL_ADD_NEW_USER = 'http://localhost:8080/add-new-user';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  public URL_GET_LOGGED_IN_USER = 'http://localhost:8080/get-logged-in-user';
  public URL_LOGOUT_USER = 'http://localhost:8080/logout';


  constructor(private http: HttpClient) {
  }

  saveUser(firstName: string, lastName: string, username: string, password: string, userGroup: UserGroup): Observable<Object> {
    this.user = new User(username, password, userGroup, firstName, lastName);
    return this.http.post(this.URL_ADD_NEW_USER, this.user, {headers: this.headers});
  }

  public getUserByUserName(): Observable<User> {
    let params = new HttpParams();
    params = params.append('userName', this.getLoggedInUser());
    return this.http.get <User>(this.URL_GET_LOGGED_IN_USER, {params: params});
  }

  setLoggedInUser(userName: string) {
    sessionStorage.setItem('userName', userName);
  }

  getLoggedInUser() {
    return sessionStorage.getItem('userName');
  }
}
