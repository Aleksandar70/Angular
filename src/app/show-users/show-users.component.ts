import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  users: User[];
  searchText;
  showSpinner = true;
  loggedInUser: User;
  @ViewChild('content') content: ElementRef;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
    this.showSpinner = false;
    this.userService.getUserByUserName().subscribe(
      data => {
        this.loggedInUser = data;
      }
    );
  }
}
