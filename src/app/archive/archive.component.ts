import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectEvaluationService} from '../service/project-evaluation.service';
import {ProjectEvaluation} from '../model/project-evaluation';
import {User} from '../model/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})

export class ArchiveComponent implements OnInit {
  appraisalSheets: ProjectEvaluation[];
  searchText;
  showSpinner = true;
  loggedInUser: User;
  showEditButton = true;
  showUnlockButton = true;

  @ViewChild('content') content: ElementRef;

  constructor(private router: Router, private appraisalSheetService: ProjectEvaluationService, private userService: UserService) {
  }

  ngOnInit() {
    if (this.userService.getUserRole() === 'Admin') {
      this.showEditButton = false;
    } else if (this.userService.getUserRole() !== 'Admin') {
      this.showUnlockButton = false;
    }
    this.appraisalSheetService.getAllAppraisalSheetsForUser(this.userService.getLoggedInUser()).subscribe(data => {
      this.appraisalSheets = data;
    });
    this.showSpinner = false;
    this.userService.getUserByUserName().subscribe(
      data => {
        this.loggedInUser = data;
      }
    );
  }

  openDocument(appraisalSheet: ProjectEvaluation) {
    this.router.navigate(['document-info'], {state: {sheet: appraisalSheet}});
  }

  editDocument(appraisalSheet: ProjectEvaluation) {
    if (!appraisalSheet.locked) {
      this.router.navigate(['project-evaluation'], {state: {sheet: appraisalSheet}});
    }
  }

  unlockDocument(appraisalSheet: ProjectEvaluation) {
    appraisalSheet.locked = false;
    this.appraisalSheetService.lockAppraisalSheet(appraisalSheet).subscribe(data => {
    });
  }
}
