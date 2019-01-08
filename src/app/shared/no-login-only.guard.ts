import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoginOnlyGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authenticationService.currentUserValue;
    console.log('no login only :', currentUser);
    if (!currentUser) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
