import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {Location} from '@angular/common';
import {AuthService} from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public route = '';

  constructor(private router: Router, private userService: UserService, location: Location, private authService: AuthService) {
    router.events.subscribe(val => {
      if (location.path().split('-').length === 3) {
        console.log('length: ' + location.path().split('-').length);
        this.route = location.path().substr(1).split('-')[0].charAt(0).toUpperCase() + location.path().substr(1).split('-')[0].slice(1)
          + ' ' + location.path().substr(1).split('-')[1] + ' ' + location.path().substr(1).split('-')[2];
        this.route = 'Project evaluation';
      } else {
        console.log('Length !=3' + location.path().split('-').length);
        this.route = location.path().substr(1).split('-')[0].charAt(0).toUpperCase() + location.path().substr(1).split('-')[0].slice(1)
          + ' ' + location.path().substr(1).split('-')[1];
      }
    });
  }

  ngOnInit() {
  }

  redirectToHomePage(pageName: string) {
    if (this.router.url !== '/login') {
      this.router.navigate([`${pageName}`]);
    }
  }

  logout(): void {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToHomePage() {
    this.router.navigate(['appraisal-sheet']);
  }
}
