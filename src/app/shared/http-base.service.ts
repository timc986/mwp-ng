import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  constructor(private http: HttpClient) {
  }

  public Get(url: string) {
    // const options = new RequestOptions({ headers: this.GetHeaders() });
    return this.http.get(url/*, options*/);
  }

  public Post(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body, this.GetOptions());
  }

  private GetOptions(): any {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });
    return options;

    // return new Headers({
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json'/*,
    //     'Authorization': 'Bearer ' + this.oauthService.getAccessToken()*/
    // });
  }
}
