import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
    this.router.navigate(['admin']);
  }

  onNewSheet() {
    this.router.navigate(['project-evaluation']);
  }

  onArchive() {
    this.router.navigate(['archive']);
  }
}
