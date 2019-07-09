import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {NgFlashMessageService} from 'ng-flash-messages';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  users: User[];
  searchText;
  showSpinner = true;
  index = 0;
  loggedInUser: User;
  @ViewChild('content') content: ElementRef;

  constructor(private router: Router, private userService: UserService, private ngFlashMessageService: NgFlashMessageService) {
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

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(data => {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['User successfully removed!'],
        dismissible: true,
        timeout: false,
        type: 'success'
      });
    });
    this.users = this.users.filter(item => item.username !== user.username);
  }
}
