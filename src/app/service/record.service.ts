import { AppConfig } from '../config/app-config';
import { Injectable } from '@angular/core';
import { HttpBaseService } from '../shared/http-base.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private httpBaseService: HttpBaseService, private config: AppConfig) {
  }

  public getAllRecords(): Observable<any> {
    return this.httpBaseService.Get(this.config.apiEndPoint + 'record/getbyuser')
      .pipe(
        map(response => {
          console.log('response: ', response);
          return response;
        }),
        catchError(error => {
          console.log('error: ', error);
          return throwError(error);
        })
      );
  }

  public createRecord(title: string, content: string, feelingId: number): Observable<any> {
    return this.httpBaseService.Post(this.config.apiEndPoint + 'record/create', { title, content, feelingId })
      .pipe(
        map(response => {
          console.log('response: ', response);
          return response;
        }),
        catchError(error => {
          console.log('error: ', error);
          return throwError(error);
        })
      );
  }

  public deleteRecord(recordId: number): Observable<any> {
    return this.httpBaseService.Delete(this.config.apiEndPoint + 'record/delete?recordId=' + recordId)
      .pipe(
        map(response => {
          console.log('response: ', response);
          return response;
        }),
        catchError(error => {
          console.log('error: ', error);
          return throwError(error);
        })
      );
  }
}
