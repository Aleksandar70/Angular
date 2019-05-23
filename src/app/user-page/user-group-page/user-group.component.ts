import {Component, OnInit} from '@angular/core';
import {UserGroupService} from '../../service/user-group.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserGroup} from "../../model/userGroup";

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css'],
  providers: [UserGroupService]
})
export class UserGroupComponent implements OnInit {

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
    this.userGroupService.addUserGroup(new UserGroup(formValue.name, formValue.description)).subscribe(
      data => {
        this.ngOnInit();
      }
    );
    form.reset();
  }

  goToHomePage() {
    this.router.navigate(['appraisal-sheet']);
  }

  goToAdminPage() {
    this.router.navigate(['admin-page']);
  }
}
