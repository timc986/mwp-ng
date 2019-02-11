import { Injectable } from '@angular/core';
import { HttpBaseService } from '../shared/http-base.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private httpBaseService: HttpBaseService, private authenticationService: AuthenticationService) { }

  public getAllRecords(): Observable<any> {
    const user = this.authenticationService.currentUserValue;
    return this.httpBaseService.Get('http://local.mwp.com/api/record/getbyuser')
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

  public createRecord(title: string, content: string): Observable<any> {
    const user = this.authenticationService.currentUserValue;
    return this.httpBaseService.Post('http://local.mwp.com/api/record/create', { title, content })
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
