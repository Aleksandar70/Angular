import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectEvaluation} from '../model/project-evaluation';
import {Router} from '@angular/router';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-document-info',
  templateUrl: './document-info.component.html',
  styleUrls: ['./document-info.component.css']
})
export class DocumentInfoComponent implements OnInit {
  appraisalSheet: ProjectEvaluation;

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
    doc.save('Evaluation' +
      this.appraisalSheet.projectName.replace(' ', '') +
      this.appraisalSheet.employeeName.replace(' ', '') +
      '.pdf');
  }
}
