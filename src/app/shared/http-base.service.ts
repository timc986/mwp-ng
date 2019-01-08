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
    return this.http.get(url, this.GetOptionsWithAuth());
  }

  public Post(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body, this.GetOptions());
  }

  private GetOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return httpOptions;
  }

  private GetOptionsWithAuth(): any {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZXhwIjoxNTQ3NTUzOTQzLCJpc3MiOiJ0aW1jaGFuIiwiYXVkIjoidGltY2hhbiJ9.IGoI6buVO-LZE0B7H0eib6-CuAvE9tGCb1FI4B28NY4'
      })
    };

    return httpOptions;
  }
}
