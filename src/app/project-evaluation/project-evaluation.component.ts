import {Component, OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ProjectEvaluationService} from '../service/project-evaluation.service';
import {ProjectEvaluation} from '../model/project-evaluation';
import {NgFlashMessageService} from 'ng-flash-messages';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-project-evaluation',
  templateUrl: './project-evaluation.component.html',
  styleUrls: ['./project-evaluation.component.css']
})
export class ProjectEvaluationComponent implements OnInit {

  role: string;
  showEmployeemanager = false;
  showEmployee = false;
  appSheet: ProjectEvaluation;
  loggedInUser: string;
  userManager: string;
  username: string;
  disabledValue = false;
  year;
  appSheets: ProjectEvaluation[];
  locked = false;
  enable = false;
  appraisalSheet: ProjectEvaluation;

  constructor(private loginService: LoginService, private router: Router, private appraisalSheetService: ProjectEvaluationService,
              private ngFlashMessageService: NgFlashMessageService, private userService: UserService) {
    if (typeof this.router.getCurrentNavigation().extras.state === 'undefined') {
      this.appraisalSheet = window.history.state;
    } else {
      this.appraisalSheet = this.router.getCurrentNavigation().extras.state.sheet;
    }
  }

  ngOnInit() {
    this.year = (new Date()).getFullYear() + ': Year end';
    this.role = this.userService.getUserRole();
    this.loggedInUser = this.userService.getNameOfUser();
    this.userManager = this.userService.getUserManager();
    this.username = this.userService.getLoggedInUser();
    if (this.role === 'Project manager') {
      this.showEmployeemanager = true;
    } else if (this.role === 'Employee') {
      this.showEmployee = true;
    }
    this.appraisalSheetService.getAllAppraisalSheets().subscribe(data => {
        this.appSheets = data;
        const filteredAppSheet = this.appSheets.find(ob => ob.user.username === this.username);
        if (typeof filteredAppSheet !== 'undefined' && this.appSheets.find(ob => ob.user.username === this.username).locked) {
          this.enable = true;
          this.ngFlashMessageService.showFlashMessage({
            messages: ['Your document is locked and already created for this year!'],
            dismissible: true,
            timeout: false,
            type: 'danger'
          });
        }
      }
    );
  }

  onAddAppSheet(form: NgForm) {
    let appSheetId = 0;
    if (this.appSheet != null) {
      appSheetId = this.appSheet.appraisalSheetID;
    }
    if (this.locked) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Document is locked!'],
        dismissible: true,
        timeout: false,
        type: 'danger'
      });
      return;
    } else {
      this.instantiateAppSheet(form);
    }
    if (appSheetId !== 0) {
      this.appSheet.appraisalSheetID = appSheetId;
    }
    this.addAppraisalSheet();
  }

  addAppraisalSheet() {
    this.appraisalSheetService.addAppraisalSheet(this.appSheet).subscribe(
      result => {
        const savedAppSheet = result as ProjectEvaluation;
        if (savedAppSheet != null) {
          this.appSheet.appraisalSheetID = savedAppSheet.appraisalSheetID;
          this.appSheet.user = savedAppSheet.user;
        }
        if (this.appSheets.find(ob => ob.user.username === this.username).locked) {
          this.ngFlashMessageService.showFlashMessage({
            messages: ['Document is locked!'],
            dismissible: true,
            timeout: false,
            type: 'danger'
          });
          return;
        }
        this.ngFlashMessageService.showFlashMessage({
          messages: ['Document successfully saved!'],
          dismissible: true,
          timeout: false,
          type: 'success'
        });
      }, error => {
        this.ngFlashMessageService.showFlashMessage({
          messages: ['An error occurred while saving your document!'],
          dismissible: true,
          timeout: false,
          type: 'danger'
        });
      }
    );
  }

  onAddAndLockAppSheet(form: NgForm) {
    if (confirm('Are you sure you want to save and lock this project evaluation? After locking no changes can be made.')) {
      let appSheetId = 0;
      if (this.appSheet != null) {
        appSheetId = this.appSheet.appraisalSheetID;
      }
      this.instantiateAppSheetAndLock(form);
      if (appSheetId !== 0) {
        this.appSheet.appraisalSheetID = appSheetId;
      }
      this.appraisalSheetService.getAllAppraisalSheets().subscribe(data => {
        this.appSheets = data;
        const filteredAppSheet = this.appSheets.find(ob => ob.user.username === this.username);
        if (filteredAppSheet !== null && this.appSheet.appraisalPeriod.startsWith((new Date()).getFullYear().toString())
          && typeof filteredAppSheet !== 'undefined' && this.appSheets.find(ob => ob.user.username === this.username).locked) {
          this.ngFlashMessageService.showFlashMessage({
            messages: ['Your document is locked and already created for this year!'],
            dismissible: true,
            timeout: false,
            type: 'danger'
          });
        } else {
          this.lockAppSheet();
        }
      });
    }
  }

  lockAppSheet() {
    this.appSheet.lockAppSheet();
    this.locked = true;
    this.appraisalSheetService.addAppraisalSheet(this.appSheet).subscribe(
      result => {
        const savedAppSheet = result as ProjectEvaluation;
        if (savedAppSheet != null) {
          this.appSheet.appraisalSheetID = savedAppSheet.appraisalSheetID;
          this.appSheet.user = savedAppSheet.user;
        }
        this.ngFlashMessageService.showFlashMessage({
          messages: ['Document successfully saved and locked!'],
          dismissible: true,
          timeout: false,
          type: 'success'
        });
      }, error => {
        this.ngFlashMessageService.showFlashMessage({
          messages: ['An error occurred while saving your document!'],
          dismissible: true,
          timeout: false,
          type: 'danger'
        });
      }
    );
    this.disabledValue = true;
  }

  private instantiateAppSheet(form: NgForm) {
    const formValue = form.value;
    this.appSheet = new ProjectEvaluation(this.loggedInUser, formValue.projectName, formValue.careerLevel,
      this.year, this.userManager, formValue.financialSituation, formValue.tasksDifficult, formValue.scope,
      formValue.functionalSpecification, formValue.hardToFollow, formValue.independent, formValue.suggestions,
      formValue.projectInFiveMonths, formValue.obstacles, formValue.best_sides_highlights, formValue.humanResources,
      formValue.peopleSatisfaction, formValue.feedbackFromClient, formValue.improvingProcess, formValue.time);
  }

  private instantiateAppSheetAndLock(form: NgForm) {
    const formValue = form.value;
    this.appSheet = new ProjectEvaluation(this.loggedInUser, formValue.projectName, formValue.careerLevel,
      this.year, this.userManager, formValue.financialSituation, formValue.tasksDifficult, formValue.scope,
      formValue.functionalSpecification, formValue.hardToFollow, formValue.independent, formValue.suggestions,
      formValue.projectInFiveMonths, formValue.obstacles, formValue.best_sides_highlights, formValue.humanResources,
      formValue.peopleSatisfaction, formValue.feedbackFromClient, formValue.improvingProcess, formValue.time);
    this.appSheet.lockAppSheet();
  }
}
