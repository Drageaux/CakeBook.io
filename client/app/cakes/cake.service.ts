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

    getCakes() {
        return this.http.get("/api/cakes")
            .map(res => <Cake[]> res.json())
            .catch(this.handleError);
    }

    getCake(id:number | String) {
        return this.http.get("/api/cake/" + id)
            .map(res => <Cake> res.json())
            .catch(this.handleError);
    }

    addCake(cake:string):Observable<Cake> {
        let body = cake;
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.post("/api/cakes", body, options)
            .map(res => <Cake> res.json())
            .catch(this.handleError);
    }

    deleteCake(id:number | String) {
        return this.http.get("/api/cake/delete/" + id)
            .catch(this.handleError);
    }

    addIngredient(id:number, ingr:string):Observable<Cake> {
        let body = JSON.stringify({"ingr": ingr});
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.post("/api/cake/" + id + "/ingredient", body, options)
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
