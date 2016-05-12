import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Http, Headers, RequestOptions, Response} from "angular2/http";

import {User} from "./user";

@Injectable()
export class UserService {
    userProfile = JSON.parse(localStorage.getItem("profile"));

    constructor(private http:Http) {
    }

    isLoggedIn() {
        return localStorage.getItem("id_token") != null;
    }

    getUser():Observable<User> {
        return this.http.get("/api/user/" + this.userProfile.user_id)
            .map(res => <User> res.json())
            .catch(this.handleError)
    }

    addUser():Observable<User> {
        if (this.userProfile == null) {
            return
        }
        let body = JSON.stringify({
            "userId": this.userProfile.user_id,
            "name": this.userProfile.name,
            "firstName": this.userProfile.given_name,
            "lastName": this.userProfile.family_name
        });
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        if (this.getUser() == null) {
            return this.http.post("/api/user/" + this.userProfile.user_id, body, options)
                .map(res => <User> res.json())
                .catch(this.handleError)
        } else {
            return this.http.put("/api/user/" + this.userProfile.user_id, body, options)
                .map(res => <User> res.json())
                .do(res => console.log(res))
                .catch(this.handleError);
        }
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