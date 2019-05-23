import {HttpClient, HttpParams} from '@angular/common/http';
import {AppraisalSheet} from '../model/appraisal-sheet';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class AppraisalSheetService {
  public URL_ADD_APPRAISAL_SHEET: string;
  public URL_ARCHIVE_PAGE: string;
  public URL_GET_APPRAISAL_SHEET: string;

  constructor(private http: HttpClient) {
    this.URL_ADD_APPRAISAL_SHEET = '/rest/add-appraisal-sheet';
    this.URL_ARCHIVE_PAGE = '/rest/archive-page';
    this.URL_GET_APPRAISAL_SHEET = '/rest/get-appraisal-sheet';
  }

  public addAppraisalSheet(appSheet: AppraisalSheet) {
    return this.http.post(this.URL_ADD_APPRAISAL_SHEET, appSheet);
  }

  public getAllAppraisalSheets(): Observable<AppraisalSheet []> {
    return this.http.get<AppraisalSheet []>(this.URL_ARCHIVE_PAGE);
  }

  public getAppraisalSheetByFirstNameAndLastName(employeeName: string): Observable<AppraisalSheet> {
    let params = new HttpParams();
    let name = employeeName.split(" ");
    let firstName = name[0];
    let lastName = name[1];
    params = params.append('firstName', firstName)
      .append('lastName', lastName);
    return this.http.get<AppraisalSheet>(this.URL_GET_APPRAISAL_SHEET, {params: params});
  }
}
