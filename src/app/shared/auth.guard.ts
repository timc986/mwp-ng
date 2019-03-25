import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }
  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   this.authenticationService.checkTokenStillValid()
  //     .pipe(map(response => {
  //       console.log('response: ', response);
  //       return true;
  //     }));
  // }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // authorised so return true
      console.log('currentUser :', currentUser);
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
