import {Injectable} from 'angular2/core';
import {Observable} from "rxjs/Observable";
import {Http, Response, RequestOptions, Headers} from "angular2/http";
import {CanActivate} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";

import {Cake} from "./cake";
import {Image} from "./image";

@Injectable()
export class CakeService {
    userId = JSON.parse(localStorage.getItem("profile")).user_id;

    constructor(private http:Http) {
    }

    getCakes() {
        return this.http.get("/api/" + this.userId + "/cakes")
            .map(res => <Cake[]> res.json())
            .catch(this.handleError);
    }

    getCake(id:number | String) {
        return this.http.get("/api/" + this.userId + "/cake/" + id)
            .map(res => <Cake> res.json())
            .catch(this.handleError);
    }

    addCake(cake:string):Observable<Cake> {
        let body = cake;
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.post("/api/" + this.userId + "/cakes", body, options)
            .map(res => <Cake> res.json())
            .catch(this.handleError);
    }

    deleteCake(id:number | String) {
        return this.http.delete("/api/" + this.userId + "/cake/" + id)
            .catch(this.handleError);
    }

    addCakeDetail(id:number, detailType:string, detailName:string):Observable<Cake> {
        let body = JSON.stringify({type: detailType, name: detailName});
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.post("/api/" + this.userId + "/cake/" + id + "/detail", body, options)
            .map(res => <Cake> res.json())
            .catch(this.handleError);
    }

    getCakeImage(id:number | string) {
        return this.http.get("/api/" + this.userId + "/cake/" + id + "/image")
            .map(res => res.json())
            .catch(this.handleError);
    }

    uploadCakeImage(id:number | string, data:string, type:string) {
        let body = JSON.stringify({data: data, dataType: type});
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        console.log("service");
        return this.http.post("/api/" + this.userId + "/cake/" + id + "/image", body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
