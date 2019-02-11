import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  constructor(private http: HttpClient) {
  }

  public Get(url: string): Observable<any> {
    // const options = new RequestOptions({ headers: this.GetHeaders() });
    return this.http.get(url, this.GetOptions());
  }

  public Post(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body, this.GetOptions());
  }

  private GetOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return httpOptions;
  }
}
