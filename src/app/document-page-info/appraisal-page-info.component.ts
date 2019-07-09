import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppraisalSheet} from '../model/appraisal-sheet';
import {Router} from '@angular/router';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-appraisal-page-info',
  templateUrl: './appraisal-page-info.component.html',
  styleUrls: ['./appraisal-page-info.component.css']
})
export class AppraisalPageInfoComponent implements OnInit {
  appraisalSheet: AppraisalSheet;

  @ViewChild('sheetContent') sheetContent: ElementRef;

  constructor(private router: Router) {
    if (typeof this.router.getCurrentNavigation().extras.state === 'undefined') {
      this.appraisalSheet = window.history.state;
    } else {
      this.appraisalSheet = this.router.getCurrentNavigation().extras.state.sheet;
    }
  }

  ngOnInit() {
  }

  public downloadPDF() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    const content = this.sheetContent.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('projectEvaluation' + this.appraisalSheet.employeeName.replace(' ', '') + '.pdf');
  }
}
