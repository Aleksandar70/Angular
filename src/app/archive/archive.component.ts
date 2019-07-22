import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectEvaluationService} from '../service/project-evaluation.service';
import {ProjectEvaluation} from '../model/project-evaluation';
import {UserDto} from '../model/userDto';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})

export class ArchiveComponent implements OnInit {
  projectEvaluations: ProjectEvaluation[];
  searchText;
  showSpinner = true;
  loggedInUser: UserDto;
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
      this.projectEvaluations = data;
    });
    this.showSpinner = false;
    this.userService.getUserByUserName().subscribe(
      data => {
        this.loggedInUser = data;
      }
    );
  }

  openDocument(projectEvaluation: ProjectEvaluation) {
    this.router.navigate(['document-info'], {state: {sheet: projectEvaluation}});
  }

  editDocument(projectEvaluation: ProjectEvaluation) {
    if (!projectEvaluation.locked) {
      this.router.navigate(['project-evaluation'], {state: {sheet: projectEvaluation}});
    }
  }

  unlockDocument(projectEvaluation: ProjectEvaluation) {
    projectEvaluation.locked = false;
    this.appraisalSheetService.lockAppraisalSheet(projectEvaluation).subscribe(data => {
    });
  }
}
