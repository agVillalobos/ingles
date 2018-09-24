import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vocabulary } from '../models/vocabulary';
import { GLOBAL } from './global';

@Injectable()
export class VocabularyService {
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getCounters(type = ""): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        var method = 'get-vocabularies-counters/';
        if (type != "")
            method += type;
        return this._http.get(this.url + method, { headers: headers });
    }

    getVocabularies(page = null, type = ""): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        var method = 'get-vocabularies/' + page;
        if (type != "")
            method += "/" + type;
        return this._http.get(this.url + method, { headers: headers });
    }

    addVocabulary(vocabulary) : Observable<any>{
        let params = JSON.stringify(vocabulary);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save-vocabulary', params, { headers: headers });
    }

}