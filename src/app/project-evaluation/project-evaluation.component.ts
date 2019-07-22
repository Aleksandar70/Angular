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
  projectEvaluation1: ProjectEvaluation;
  loggedInUser: string;
  userManagerDto: string;
  username: string;
  disabledValue = false;
  year;
  projectEvaluations: ProjectEvaluation[];
  locked = false;
  enable = false;
  projectEvaluation: ProjectEvaluation;

  constructor(private loginService: LoginService, private router: Router, private appraisalSheetService: ProjectEvaluationService,
              private ngFlashMessageService: NgFlashMessageService, private userService: UserService) {
    if (typeof this.router.getCurrentNavigation().extras.state === 'undefined') {
      this.projectEvaluation = window.history.state;
    } else {
      this.projectEvaluation = this.router.getCurrentNavigation().extras.state.sheet;
    }
  }

  ngOnInit() {
    this.year = (new Date()).getFullYear() + ': Year end';
    this.role = this.userService.getUserRole();
    this.loggedInUser = this.userService.getNameOfUser();
    this.userManagerDto = this.userService.getUserManager();
    this.username = this.userService.getLoggedInUser();
    if (this.role === 'Project manager') {
      this.showEmployeemanager = true;
    } else if (this.role === 'Employee') {
      this.showEmployee = true;
    }
    this.appraisalSheetService.getAllAppraisalSheets().subscribe(data => {
        this.projectEvaluations = data;
        console.log('App: ' + this.projectEvaluations);
        const filteredAppSheet = this.projectEvaluations.find(ob => ob.userDto.username === this.username);
        if (typeof filteredAppSheet !== 'undefined' && this.projectEvaluations.find(ob => ob.userDto.username === this.username).locked) {
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
    if (this.projectEvaluation1 != null) {
      appSheetId = this.projectEvaluation1.projectEvaluationID;
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
      this.projectEvaluation1.projectEvaluationID = appSheetId;
    }
    this.addAppraisalSheet();
  }

  addAppraisalSheet() {
    this.appraisalSheetService.addAppraisalSheet(this.projectEvaluation1).subscribe(
      result => {
        const savedAppSheet = result as ProjectEvaluation;
        if (savedAppSheet != null) {
          this.projectEvaluation1.projectEvaluationID = savedAppSheet.projectEvaluationID;
          this.projectEvaluation1.userDto = savedAppSheet.userDto;
        }
        console.log('App sheets :' + this.projectEvaluations);
        if (this.projectEvaluations.length > 0
          && typeof this.projectEvaluations.find(ob => ob.userDto.username === this.username) !== 'undefined'
          && this.projectEvaluations.find(ob => ob.userDto.username === this.username).locked) {
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
      if (this.projectEvaluation1 != null) {
        appSheetId = this.projectEvaluation1.projectEvaluationID;
      }
      this.instantiateAppSheetAndLock(form);
      if (appSheetId !== 0) {
        this.projectEvaluation1.projectEvaluationID = appSheetId;
      }
      this.appraisalSheetService.getAllAppraisalSheets().subscribe(data => {
        this.projectEvaluations = data;
        const filteredAppSheet = this.projectEvaluations.find(ob => ob.userDto.username === this.username);
        if (filteredAppSheet !== null && this.projectEvaluation1.appraisalPeriod.startsWith((new Date()).getFullYear().toString())
          && typeof filteredAppSheet !== 'undefined' && this.projectEvaluations.find(ob => ob.userDto.username === this.username).locked) {
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
    this.projectEvaluation1.lockAppSheet();
    this.locked = true;
    this.appraisalSheetService.addAppraisalSheet(this.projectEvaluation1).subscribe(
      result => {
        const savedAppSheet = result as ProjectEvaluation;
        if (savedAppSheet != null) {
          this.projectEvaluation1.projectEvaluationID = savedAppSheet.projectEvaluationID;
          this.projectEvaluation1.userDto = savedAppSheet.userDto;
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
    this.projectEvaluation1 = new ProjectEvaluation(this.loggedInUser, formValue.projectName, formValue.careerLevel,
      this.year, this.userManagerDto, formValue.financialSituation, formValue.tasksDifficult, formValue.scope,
      formValue.functionalSpecification, formValue.hardToFollow, formValue.independent, formValue.suggestions,
      formValue.projectInFiveMonths, formValue.obstacles, formValue.best_sides_highlights, formValue.humanResources,
      formValue.peopleSatisfaction, formValue.feedbackFromClient, formValue.improvingProcess, formValue.time);
  }

  private instantiateAppSheetAndLock(form: NgForm) {
    const formValue = form.value;
    this.projectEvaluation1 = new ProjectEvaluation(this.loggedInUser, formValue.projectName, formValue.careerLevel,
      this.year, this.userManagerDto, formValue.financialSituation, formValue.tasksDifficult, formValue.scope,
      formValue.functionalSpecification, formValue.hardToFollow, formValue.independent, formValue.suggestions,
      formValue.projectInFiveMonths, formValue.obstacles, formValue.best_sides_highlights, formValue.humanResources,
      formValue.peopleSatisfaction, formValue.feedbackFromClient, formValue.improvingProcess, formValue.time);
    this.projectEvaluation1.lockAppSheet();
  }
}
