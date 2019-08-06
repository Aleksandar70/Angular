import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.getUserRole() === 'Admin') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
