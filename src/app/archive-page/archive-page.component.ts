import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppraisalSheetService} from "../service/appraisal-sheet.service";
import {AppraisalSheet} from "../model/appraisal-sheet";
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.css']
})

export class ArchivePageComponent implements OnInit {

  appraisalSheets: AppraisalSheet[];
  searchText;
  appraisalSheet: AppraisalSheet;

  @ViewChild('content') content: ElementRef;

  constructor(private router: Router, private appraisalSheetService: AppraisalSheetService) {
  }

  ngOnInit() {
    this.appraisalSheetService.getAllAppraisalSheets().subscribe(data => {
      this.appraisalSheets = data;
    })
  }

  goToHomePage() {
    this.router.navigate(['appraisal-sheet']);
  }

  public downloadPDF(employeeName: string) {
    this.appraisalSheetService.getAppraisalSheetByFirstNameAndLastName(employeeName).subscribe(data => {
      this.appraisalSheet = data;
    });
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('appraisalSheet.pdf');
  }

}
