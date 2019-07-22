import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserDto} from '../model/userDto';

@Injectable()
export class LoginService {
  user: UserDto;
  role: string;
  public URL_LOGIN = 'http://localhost:8080/login';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  loginUser(username: string, password: string): Observable<Object> {
    this.user = new UserDto(username, password);
    return this.http.post(this.URL_LOGIN , this.user, {headers: this.headers});
  }
}
