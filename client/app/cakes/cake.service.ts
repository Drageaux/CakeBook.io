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

    /********************
     * Single Cake REST *
     ********************/
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

    addCakeDetail(id:number, detailType:string, detailValue:string):Observable<Cake> {
        let body = JSON.stringify({value: detailValue});
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.post("/api/" + this.userId + "/cake/" + id + "/" + detailType, body, options)
            .map(res => <Cake> res.json())
            .catch(this.handleError);
    }

    removeCakeDetail(id:number, detailType:string, index:number) {
        return this.http.delete("/api/" + this.userId + "/cake/" + id + "/" + detailType + "/" + index)
            .map(res => <Cake> res.json())
            .catch(this.handleError);
    }

    updateCakeDetail(id:number, detailType:string, index:number, detailValue:string) {
        let body;
        if (detailType == "ingr" || detailType == "step") {
            body = detailValue;
            console.log(body);
        } else {
            body = JSON.stringify({index: index, value: detailValue});
        }
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.put("/api/" + this.userId + "/cake/" + id + "/" + detailType, body, options)
            .map(res => <Cake> res.json())
            .catch(this.handleError);
    }


    /**************
     * Image REST *
     **************/
    uploadCakeImage(id:number | string, data:string, type:string) {
        let body = JSON.stringify({data: data, dataType: type});
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.put("/api/" + this.userId + "/cake/" + id + "/image", body, options)
            .map(res => <Cake> res.json())
            .catch(this.handleError);
    }


    /*****************
     * External APIs *
     *****************/
    searchCake(query:string) {
        //.
        //        .end(function (result) {
        //            console.log(result.status, result.headers, result.body);
        //        });
        //let
        return this.http.get("/api/search/" + query)
            .subscribe(results => console.log(results.json()))
    }


    private handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
