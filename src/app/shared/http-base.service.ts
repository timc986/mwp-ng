import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';

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

  // public Post(url: string, body: any){
  //   const options = new RequestOptions({
  //     method: RequestMethod.Post,
  //     headers: this.GetHeaders(),
  //     body: JSON.stringify(body),
  //     url: url
  //   });
  //   return this.http.request(new Request(options));
  // }

  private GetHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'/*,
        'Authorization': 'Bearer ' + this.oauthService.getAccessToken()*/
    });
  }
}
