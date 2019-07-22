import {HttpClient, HttpParams} from '@angular/common/http';
import {ProjectEvaluation} from '../model/project-evaluation';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ProjectEvaluationService {
  public URL_ADD_APPRAISAL_SHEET: string;
  public URL_ARCHIVE_PAGE: string;
  public URL_GET_APPRAISAL_SHEET: string;
  public URL_LOCK_APPRAISAL_SHEET;

  constructor(private http: HttpClient) {
    this.URL_ADD_APPRAISAL_SHEET = 'http://localhost:8080/add-appraisal-sheet';
    this.URL_ARCHIVE_PAGE = 'http://localhost:8080/archive';
    this.URL_GET_APPRAISAL_SHEET = 'http://localhost:8080/get-appraisal-sheet';
    this.URL_LOCK_APPRAISAL_SHEET = 'http://localhost:8080/lock-appraisal-sheet';
  }

  public addAppraisalSheet(projectEvaluation: ProjectEvaluation) {
    return this.http.post(this.URL_ADD_APPRAISAL_SHEET, projectEvaluation);
  }

  public getAllAppraisalSheetsForUser(username: string): Observable<ProjectEvaluation []> {
    let params = new HttpParams();
    params = params.append('userName', username);
    return this.http.get<ProjectEvaluation []>(this.URL_ARCHIVE_PAGE, {params: params});
  }

  // public getAppraisalSheetById(employeeName: string): Observable<ProjectEvaluation> {
  //   return this.http.get<ProjectEvaluation>(this.URL_GET_APPRAISAL_SHEET);
  // }

  public getAllAppraisalSheets(): Observable<ProjectEvaluation[]> {
    return this.http.get<ProjectEvaluation[]>(this.URL_GET_APPRAISAL_SHEET);
  }

  public lockAppraisalSheet(projectEvaluation: ProjectEvaluation) {
    return this.http.post(this.URL_LOCK_APPRAISAL_SHEET, projectEvaluation);
  }

}
