import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {UserGroup} from '../model/userGroup';
import {UserGroupService} from '../service/user-group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  userGroups: UserGroup[] = [];
  userGroup: UserGroup;
  selectedUserGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private userGroupService: UserGroupService) {
  }

  ngOnInit() {
    this.userGroupService.getUserGroups().subscribe(groups => this.userGroups = groups);
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.userForm.controls;
  }

  goToAdminPage() {
    this.router.navigate(['admin-page']);
  }

  goToHomePage() {
    this.router.navigate(['appraisal-sheet']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.userService.saveUser(this.formControls.firstName.value, this.formControls.lastName.value, this.formControls.username.value, this.formControls.password.value, this.selectedUserGroup).subscribe(result => {
    });
  }
}
