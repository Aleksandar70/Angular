import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserDto} from '../model/userDto';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {NgFlashMessageService} from 'ng-flash-messages';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  users: UserDto[];
  searchText;
  showSpinner = true;
  loggedInUser: UserDto;
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

  deleteUser(userDto: UserDto) {
    this.userService.deleteUser(userDto).subscribe(data => {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['User successfully removed!'],
        dismissible: true,
        timeout: false,
        type: 'success'
      });
    }, errorNullUser => this.ngFlashMessageService.showFlashMessage({
      messages: ['User does not exist!'],
      dismissible: true,
      timeout: false,
      type: 'danger'
    }));
    this.users = this.users.filter(item => item.username !== userDto.username);
  }
}
