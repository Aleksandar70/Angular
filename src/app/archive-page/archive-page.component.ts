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
  showSpinner = true;
  loggedInUser: User;
  showEditButton = true;
  showUnlockButton = true;

  @ViewChild('content') content: ElementRef;

  constructor(private router: Router, private appraisalSheetService: AppraisalSheetService, private userService: UserService) {
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

  // updateList(id: number, property: string, event: any) {
  //   const editField = event.target.textContent;
  //   this.appraisalSheets[id][property] = editField;
  // }
  //
  //
  // changeValue(id: number, property: string, event: any) {
  //   this.editField = event.target.textContent;
  // }

  openDocument(appraisalSheet: AppraisalSheet) {
    this.router.navigate(['document-info'], {state: {sheet: appraisalSheet}});
  }

  editDocument(appraisalSheet: AppraisalSheet) {
    if (!appraisalSheet.locked) {
      this.router.navigate(['project-evaluation'], {state: {sheet: appraisalSheet}});
    }
  }

  unlockDocument(appraisalSheet: AppraisalSheet) {
    appraisalSheet.locked = false;
    this.appraisalSheetService.lockAppraisalSheet(appraisalSheet).subscribe(data => {
    });
  }
}
