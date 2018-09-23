import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhrasalVerb } from '../models/phrasalverb';
import { GLOBAL } from './global';

@Injectable()
export class PhrasalVerbService {
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }
    getCounters(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'get-phrasal-verbs-counters/', { headers: headers });
    }



    getPhrasalVerbs(page = null): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'get-phrasal-verbs/' + page, { headers: headers });
    }

}