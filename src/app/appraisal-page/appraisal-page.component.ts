import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login.service';

@Component({
  selector: 'app-appraisal-page',
  templateUrl: './appraisal-page.component.html',
  styleUrls: ['./appraisal-page.component.css']
})
export class AppraisalPageComponent implements OnInit {
  role: string;
  showAdminPage = false;
  showEvaluateProject = false;

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    this.role = this.loginService.getUserRole();
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
    this.router.navigate(['new-sheet-page']);
  }

  onArchive() {
    this.router.navigate(['archive-page']);
  }

}
