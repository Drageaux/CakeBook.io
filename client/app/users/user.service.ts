import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Http, Headers, RequestOptions, Response} from "angular2/http";

import {User} from "./user";
import {} from "angular2/http";
import {} from "angular2/http";

@Injectable()
export class UserService {
    userId = JSON.parse(localStorage.getItem("profile")).user_id;

    constructor(private http:Http) {
    }

    getUser():Observable<User> {
        return this.http.get("/api/user/" + this.userId)
            .map(res => <User> res.json())
            .catch(this.handleError)
    }

    addUser(user:string):Observable<User> {
        let body = user;
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.post("/api/user/" + this.userId, body, options)
            .map(res => <User> res.json())
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