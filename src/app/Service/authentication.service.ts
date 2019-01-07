import { Injectable } from '@angular/core';
import { HttpBaseService } from '../shared/http-base.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpBaseService: HttpBaseService) { }

  public login(email: string, password: string): Observable<any> {
    return this.httpBaseService.Post('http://local.mwp.com/api/login/login', { email, password })
      .pipe(
        map(response => {
          console.log('response: ', response);
        })
      );
  }
}
