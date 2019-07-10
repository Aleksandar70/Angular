import {Component, OnInit, ViewChild} from '@angular/core';
import {UserGroupService} from '../../service/user-group.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserGroup} from '../../model/userGroup';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css'],
  providers: [UserGroupService]
})
export class UserGroupComponent implements OnInit {
  @ViewChild('userGroupForm') userGroupForm: NgForm;
  userGroup: UserGroup[];

  constructor(private route: ActivatedRoute, private router: Router, private userGroupService: UserGroupService) {
  }

  ngOnInit() {
    this.userGroupService.getUserGroups().subscribe(
      data => {
        this.userGroup = data;
      }
    );
  }

  onAddUserGroup(form: NgForm) {
    const formValue = form.value;
    if (formValue.name !== '' && formValue.description !== '' && formValue.name !== null) {
      this.userGroupService.addUserGroup(new UserGroup(formValue.name, formValue.description)).subscribe(
        data => {
          this.ngOnInit();
        }
      );
    }
    form.reset();
  }
}
