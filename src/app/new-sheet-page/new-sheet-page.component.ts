import {Component, OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AppraisalSheetService} from '../service/appraisal-sheet.service';
import {AppraisalSheet} from '../model/appraisal-sheet';
import {NgFlashMessageService} from 'ng-flash-messages';

@Component({
  selector: 'app-new-sheet-page',
  templateUrl: './new-sheet-page.component.html',
  styleUrls: ['./new-sheet-page.component.css']
})
export class NewSheetPageComponent implements OnInit {

  role: string;
  showEmployeemanager = false;
  showEmployee = false;
  appSheet: AppraisalSheet;

  constructor(private loginService: LoginService, private router: Router, private appraisalSheetService: AppraisalSheetService,
              private ngFlashMessageService: NgFlashMessageService) {
  }

  ngOnInit() {
    this.role = this.loginService.getUserRole();
    if (this.role === 'Employee manager') {
      this.showEmployeemanager = true;
    } else if (this.role === 'Employee') {
      this.showEmployee = true;
    }
  }

  onAddAppSheet(form: NgForm) {
    let appSheetId = 0;
    if (this.appSheet != null) {
      appSheetId = this.appSheet.appraisalSheetID;
    }
    this.instantiateAppSheet(form);
    if (appSheetId !== 0) {
      this.appSheet.appraisalSheetID = appSheetId;
    }
    this.appraisalSheetService.addAppraisalSheet(this.appSheet).subscribe(
      result => {
        const savedAppSheet = result as AppraisalSheet;
        if (savedAppSheet != null) {
          this.appSheet.appraisalSheetID = savedAppSheet.appraisalSheetID;
          this.appSheet.user = savedAppSheet.user;
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
    if (confirm('Are you sure you want to save and lock this appraisal sheet? After locking no changes can be made.')) {
      let appSheetId = 0;
      if (this.appSheet != null) {
        appSheetId = this.appSheet.appraisalSheetID;
      }
      this.instantiateAppSheet(form);
      if (appSheetId !== 0) {
        this.appSheet.appraisalSheetID = appSheetId;
      }
      this.appSheet.lockAppSheet();
      this.appraisalSheetService.addAppraisalSheet(this.appSheet).subscribe(
        result => {
          const savedAppSheet = result as AppraisalSheet;
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
    }
  }

  private instantiateAppSheet(form: NgForm) {
    const formValue = form.value;
    this.appSheet = new AppraisalSheet(formValue.name, formValue.division, formValue.careerLevel,
      formValue.appraisalPeriod, formValue.manager, formValue.tasksBackdated, formValue.teamLeadFeedback, formValue.companyFeedback,
      formValue.targetsBackdated, formValue.roleRequirements, formValue.selfCompetence, formValue.socialCompetence,
      formValue.methodicalCompetence, formValue.roleRequirementsGoals, formValue.selfCompetenceGoals, formValue.companyOrientedGoals,
      formValue.economicGoal, formValue.developmentObjectives, formValue.developmentPotential, formValue.employeeExpectations);
  }
}
