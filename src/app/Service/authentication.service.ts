import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpBaseService } from '../shared/http-base.service';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpBaseService: HttpBaseService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    if (this.currentUserSubject) {
      return this.currentUserSubject.value;
    }
    return null;
  }

  public login(email: string, password: string): Observable<any> {
    return this.httpBaseService.Post('http://local.mwp.com/api/login/login', { email, password })
      .pipe(
        map(response => {
          console.log('response: ', response);
          if (response && response.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(response.user));
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
    localStorage.removeItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.router.navigate(['/login']);
  }

  public register(name: string, email: string, password: string): Observable<any> {
    return this.httpBaseService.Post('http://local.mwp.com/api/login/create', { name, email, password })
      .pipe(
        map(response => {
          console.log('response: ', response);
          // if (response && response.token) {
          //   // store user details and jwt token in local storage to keep user logged in between page refreshes
          //   localStorage.setItem('currentUser', JSON.stringify(response.user));
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
