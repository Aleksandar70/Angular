import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppraisalSheetService} from '../service/appraisal-sheet.service';
import {AppraisalSheet} from '../model/appraisal-sheet';
import {User} from '../model/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.css']
})

export class ArchivePageComponent implements OnInit {

  appraisalSheets: AppraisalSheet[];
  searchText;
  appraisalSheet: AppraisalSheet;
  showSpinner = true;
  loggedInUser: User;
  editField: string;
  @ViewChild('content') content: ElementRef;

  constructor(private router: Router, private appraisalSheetService: AppraisalSheetService, private userService: UserService) {
  }

  ngOnInit() {
    // uradi proveru da li je rola admin!
    if (this.userService.getLoggedInUser() === 'sandra@gmail.com') {
      this.appraisalSheetService.getAllAppraisalSheets().subscribe(data => {
        this.appraisalSheets = data;
      });
    } else {
      this.appraisalSheetService.getAllAppraisalSheetsForUser(this.userService.getLoggedInUser()).subscribe(data => {
        this.appraisalSheets = data;
      });
    }
    this.showSpinner = false;
    this.userService.getUserByUserName().subscribe(
      data => {
        this.loggedInUser = data;
      }
    );
  }

  // displayedColumns: string[] = ['Name', 'Status', 'Actions'];
  editAppraisalSheet() {

  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.appraisalSheets[id][property] = editField;
  }


  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  openDocument(appraisalSheet: AppraisalSheet) {
    this.router.navigate(['appraisal-sheet-info'], {state: {sheet: appraisalSheet}});
  }

  editDocument(appraisalSheet: AppraisalSheet) {
    this.router.navigate(['new-sheet-page'], {state: {sheet: appraisalSheet}});
  }
}
