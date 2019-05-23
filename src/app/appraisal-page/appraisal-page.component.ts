import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-appraisal-page',
  templateUrl: './appraisal-page.component.html',
  styleUrls: ['./appraisal-page.component.css']
})
export class AppraisalPageComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
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
