import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/internal/operators/map';


@Injectable()
export class AppConfig {
    private config: any;
    // private env: any;

    constructor(private http: Http) { }

    public load(): Promise<any> {
        const configPromise = this.http.get('config.json').pipe(map(response => response.json())).toPromise();
        configPromise.then(r => this.config = r);
        return configPromise;
    }

    // public load(): Observable<any> {
    //     console.log('load');
    //     return this.httpGetJson('./config/env.json')
    //         .pipe(
    //             map(response => {
    //                 console.log('response: ', response);
    //                 this.env = response;
    //                 this.httpGetJson('./config/' + response.env + '.json')
    //                     .pipe(
    //                         map(response2 => {
    //                             console.log('response2: ', response2);
    //                             this.config = response2;
    //                         })
    //                     );
    //             })
    //         );
    // }

    // getEnv(key: any) {
    //     return this.env[key];
    // }

    public get apiEndPoint(): string {
        return this.config['API_END_POINT'];
    }
}
