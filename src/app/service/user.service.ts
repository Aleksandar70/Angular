import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {UserGroup} from '../model/userGroup';
import {UserManager} from '../model/user-manager';

@Injectable()
export class UserService {
  user: User;
  public URL_ADD_NEW_USER = 'http://localhost:8080/add-new-user';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  public URL_GET_LOGGED_IN_USER = 'http://localhost:8080/get-logged-in-user';
  public URL_GET_ALL_USERS = 'http://localhost:8080/get-all-users';
  public URL_DELETE_USER = 'http://localhost:8080/delete-user';

  constructor(private http: HttpClient) {
  }

  saveUser(firstName: string, lastName: string,
           username: string, password: string,
           userGroup: UserGroup, userManager: UserManager): Observable<Object> {
    this.user = new User(username, password, userGroup, firstName, lastName, userManager);
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

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL_GET_ALL_USERS);
  }

  setNameOfUser(name: string) {
    sessionStorage.setItem('name', name);
  }

  getNameOfUser() {
    return sessionStorage.getItem('name');
  }

  setUserManager(userManager: string) {
    sessionStorage.setItem('userManager', userManager);
  }

  getUserManager() {
    return sessionStorage.getItem('userManager');
  }

  getUserRole() {
    return sessionStorage.getItem('role');
  }

  setUserRole(role: string) {
    sessionStorage.setItem('role', role);
  }

  deleteUser(user: User) {
    const username = user.username;
    return this.http.delete(`${this.URL_DELETE_USER}/${username}`, {headers: this.headers});
  }

  getisLoggedIn() {
    return sessionStorage.getItem('isLoggedIn');
  }

  setIsLoggedIn(value: string) {
    sessionStorage.setItem('isLoggedIn', value);
  }
}
