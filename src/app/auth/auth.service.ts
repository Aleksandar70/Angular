import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;

  constructor(private http: HttpClient) {
  }

  logout(): void {
    this.setLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }

 public setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }
}
