import {Injectable} from 'angular2/core';
import {Observable} from "rxjs/Observable";
import {Http} from "angular2/http";
import {Response} from "angular2/http";
import {Headers} from "angular2/http";
import {RequestOptions} from "angular2/http";

import {Cake} from "./cake";

@Injectable()
export class CakeService {
    constructor(private http:Http) {
    }

    private _cakesUrl = "/api/cakes";

    getCakes() {
        return this.http.get(this._cakesUrl)
            .map(res => <Cake[]> res.json())
            //.do(data => console.log(data)) // print out Cake list
            .catch(this.handleError);
    }

    getCake(id:number | String) {
        return this.http.get(this._cakesUrl)
            .map(res => (<Cake> res.json().data
            .filter(c => c.id === +id)[0]))
            .catch(this.handleError);
    }

    addCake(name:string):Observable<Cake> {
        let body = JSON.stringify({name});
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this._cakesUrl, body, options)
            .map(res => <Cake> res.json())
            .catch(this.handleError);
    }

    private handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
