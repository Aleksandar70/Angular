import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserDto} from '../model/userDto';
import {Observable} from 'rxjs';
import {UserGroupDto} from '../model/userGroupDto';
import {UserManagerDto} from '../model/user-manager';

@Injectable()
export class UserService {
  user: UserDto;
  public URL_ADD_NEW_USER = 'http://localhost:8080/add-new-user';
  public URL_GET_LOGGED_IN_USER = 'http://localhost:8080/get-logged-in-user';
  public URL_GET_ALL_USERS = 'http://localhost:8080/get-all-users';
  public URL_DELETE_USER = 'http://localhost:8080/delete-user';
  public URL_FORGOT_PASSWORD = 'http://localhost:8080/reset-password-email';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  saveUser(firstName: string, lastName: string,
           username: string, password: string,
           userGroup: UserGroupDto, userManagerDto: UserManagerDto): Observable<Object> {
    this.user = new UserDto(username, password, userGroup, firstName, lastName, userManagerDto);
    return this.http.post(this.URL_ADD_NEW_USER, this.user, {headers: this.headers});
  }

  public getUserByUserName(): Observable<UserDto> {
    let params = new HttpParams();
    params = params.append('userName', this.getLoggedInUser());
    return this.http.get <UserDto>(this.URL_GET_LOGGED_IN_USER, {params: params});
  }

  setLoggedInUser(userName: string) {
    sessionStorage.setItem('userName', userName);
  }

  getLoggedInUser() {
    return sessionStorage.getItem('userName');
  }

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.URL_GET_ALL_USERS);
  }

  setNameOfUser(name: string) {
    sessionStorage.setItem('name', name);
  }

  getNameOfUser() {
    return sessionStorage.getItem('name');
  }

  setUserManager(userManagerDto: string) {
    sessionStorage.setItem('userManagerDto', userManagerDto);
  }

  getUserManager() {
    return sessionStorage.getItem('userManagerDto');
  }

  getUserRole() {
    return sessionStorage.getItem('role');
  }

  setUserRole(role: string) {
    sessionStorage.setItem('role', role);
  }

  deleteUser(userDto: UserDto) {
    const username = userDto.username;
    return this.http.delete(`${this.URL_DELETE_USER}/${username}`, {headers: this.headers});
  }

  getisLoggedIn() {
    return sessionStorage.getItem('isLoggedIn');
  }

  setIsLoggedIn(value: string) {
    sessionStorage.setItem('isLoggedIn', value);
  }

  sendResetPasswordEmail(username: string) {
    return this.http.post(this.URL_FORGOT_PASSWORD, {username: username});
  }
}
