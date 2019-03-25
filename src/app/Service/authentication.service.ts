import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpBaseService } from '../shared/http-base.service';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserModel } from '../model/user.model';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private httpBaseService: HttpBaseService, private router: Router , private config: AppConfig) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentMwpUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    if (this.currentUserSubject) {
      return this.currentUserSubject.value;
    }
    return null;
  }

  public login(email: string, password: string): Observable<any> {
    return this.httpBaseService.Post(this.config.apiEndPoint + 'login/login', { email, password })
      .pipe(
        map(response => {
          console.log('response: ', response);
          if (response && response.user && response.user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentMwpUser', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }

          return response;
        }),
        catchError(error => {
          console.log('error: ', error);
          return throwError(error);
        })
      );
  }

  public logout() {
    localStorage.removeItem('currentMwpUser');
    this.currentUserSubject = new BehaviorSubject<UserModel>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.router.navigate(['/login']);
  }

  public checkTokenStillValid(): Observable<any> {
    return this.httpBaseService.Get(this.config.apiEndPoint + 'login/check')
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

  public register(name: string, email: string, password: string): Observable<any> {
    return this.httpBaseService.Post(this.config.apiEndPoint + 'login/create', { name, email, password })
      .pipe(
        map(response => {
          console.log('response: ', response);
          // if (response && response.token) {
          //   // store user details and jwt token in local storage to keep user logged in between page refreshes
          //   localStorage.setItem('currentMwpUser', JSON.stringify(response.user));
          //   this.currentUserSubject.next(response.user);
          // }

          return response;
        }),
        catchError(error => {
          console.log('error: ', error);
          return throwError(error);
        })
      );
  }
}
