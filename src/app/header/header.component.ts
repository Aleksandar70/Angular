import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {Location} from '@angular/common';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public route = '';
  showAdminPageNavigation = false;
  showUserPageNavigation = false;
  firstName;

  constructor(private router: Router, private userService: UserService, location: Location, private authService: AuthService) {
    router.events.subscribe(val => {
      this.route = location.path().substr(1).split('-')[0].charAt(0).toUpperCase() + location.path().substr(1).split('-')[0].slice(1)
        + ' ' + location.path().substr(1).split('-')[1];
      if (this.route.startsWith('All users')
        || this.route.startsWith('New user')
        || this.route.startsWith('UserDto group')
        || this.route.startsWith('Admin page')) {
        this.showAdminPageNavigation = true;
      }
      if (this.route.startsWith('Document info') || this.route.startsWith('Archive') || this.route.startsWith('Project evaluation')) {
        this.showUserPageNavigation = true;
      }
      if (this.route.startsWith('Project evaluation')) {
        this.showUserPageNavigation = false;
      }
      if (this.route.startsWith('Archive')) {
        this.route = '';
      }
      if (this.route.startsWith('Home')) {
        this.showUserPageNavigation = false;
        this.showAdminPageNavigation = false;
        this.route = '';
      }
      if (this.route.startsWith('Admin')) {
        this.showUserPageNavigation = false;
        this.route = '';
      }
    });
  }

  ngOnInit() {
    if (this.userService.getNameOfUser() !== null) {
      this.getFirstName();
    }
  }

  redirectToHomePage(pageName: string) {
    if (this.router.url !== '/login') {
      this.router.navigate([`${pageName}`]);
    }
  }

  logout(): void {
    // this.authService.logout();
    this.userService.setIsLoggedIn('false');
    this.router.navigate(['/login']);
  }

  goToHomePage() {
    this.router.navigate(['home']);
  }

  goToAdminPage() {
    this.router.navigate(['admin']);
  }

  goToArchivePage() {
    this.router.navigate(['archive']);
  }

  getFirstName() {
    this.firstName = this.userService.getNameOfUser().split(' ')[0];
  }
}
