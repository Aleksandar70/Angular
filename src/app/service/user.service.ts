import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {UserGroup} from "../model/userGroup";

@Injectable()
export class UserService {
  user: User;
  public URL_ADD_NEW_USER = '/rest/add-new-user';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  saveUser(firstName: string, lastName: string, username: string, password: string, userGroup: UserGroup): Observable<Object> {
    this.user = new User(username, password, userGroup, firstName, lastName);
    return this.http.post(this.URL_ADD_NEW_USER, this.user, {headers: this.headers});
  }
}
