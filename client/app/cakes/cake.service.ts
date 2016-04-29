import {Injectable} from 'angular2/core';
import {Observable} from "rxjs/Observable";
import {Http, Response, RequestOptions, Headers} from "angular2/http";
import {CanActivate} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";

import {Cake} from "./cake";

@Injectable()
export class CakeService {
    userId = JSON.parse(localStorage.getItem("profile")).user_id;

    constructor(private http:Http) {
    }

    getCakes():Observable<Cake[]> {
        return this.http.get("/api/" + this.userId + "/cakes")
            .map(res => <Cake[]> res.json())
            .catch(this.handleError);
    }

    /********************
     * Single Cake REST *
     ********************/
    getCake(id:number | string) {
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

    deleteCake(id:number) {
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
    searchCakes(query:string, start:string, end:string) {
        if (parseInt(start) < 1) {
            start = "1";
        }
        return this.http.get("/spoonacular/search/query=" + query +
                "/" + start + "/" + end)
            .map(res => <any> res.json())
            .catch(this.handleError);
    }

    searchCakeById(id:string) {
        return this.http.get("/spoonacular/searchBy/id/query=" + id)
            .map(res => <any> res.json())
            .catch(this.handleError)
    }

    extractCake(query:string) {
        return this.http.get("/spoonacular/extract/query=" + query)
            .map(res => <any> res.json())
            .catch(this.handleError);
    }


    /********************
     * Helper Functions *
     ********************/
    isUrl(input:string) {
        let regex = new RegExp('^(ftp|http|https):\/\/[^ "]+$');
        return input.match(regex) != null;
    }

    private handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
