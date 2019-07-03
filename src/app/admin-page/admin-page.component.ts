import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onNewUser() {
    this.router.navigate(['new-user']);
  }

  onNewUserGroup() {
    this.router.navigate(['user-group']);
  }

  showUsersByGroup() {
  this.router.navigate(['all-users']);
  }
}
