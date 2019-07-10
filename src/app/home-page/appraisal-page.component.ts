import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-appraisal-page',
  templateUrl: './appraisal-page.component.html',
  styleUrls: ['./appraisal-page.component.css']
})
export class AppraisalPageComponent implements OnInit {
  role: string;
  showAdminPage = false;
  showEvaluateProject = false;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.role = this.userService.getUserRole();
    if (this.role === 'Admin') {
      this.showAdminPage = true;
    } else {
      this.showEvaluateProject = true;
    }
  }

  onAdminPage() {
    this.router.navigate(['admin-page']);
  }

  onNewSheet() {
    this.router.navigate(['project-evaluation']);
  }

  onArchive() {
    this.router.navigate(['archive-page']);
  }
}
