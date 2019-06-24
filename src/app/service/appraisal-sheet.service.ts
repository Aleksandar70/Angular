import {HttpClient, HttpParams} from '@angular/common/http';
import {AppraisalSheet} from '../model/appraisal-sheet';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AppraisalSheetService {
  public URL_ADD_APPRAISAL_SHEET: string;
  public URL_ARCHIVE_PAGE: string;
  public URL_GET_APPRAISAL_SHEET: string;

  constructor(private http: HttpClient) {
    this.URL_ADD_APPRAISAL_SHEET = 'http://localhost:8080/add-appraisal-sheet';
    this.URL_ARCHIVE_PAGE = 'http://localhost:8080/archive-page';
    this.URL_GET_APPRAISAL_SHEET = 'http://localhost:8080/get-appraisal-sheet';
  }

  public addAppraisalSheet(appSheet: AppraisalSheet) {
    return this.http.post(this.URL_ADD_APPRAISAL_SHEET, appSheet);
  }

  public getAllAppraisalSheetsForUser(username: string): Observable<AppraisalSheet []> {
    let params = new HttpParams();
    params = params.append('userName', username);
    return this.http.get<AppraisalSheet []>(this.URL_ARCHIVE_PAGE, {params: params});
  }

  public getAppraisalSheetById(employeeName: string): Observable<AppraisalSheet> {
    return this.http.get<AppraisalSheet>(this.URL_GET_APPRAISAL_SHEET);
  }

  public getAllAppraisalSheets(): Observable<AppraisalSheet []> {
    return this.http.get<AppraisalSheet []>(this.URL_GET_APPRAISAL_SHEET);
  }

}
