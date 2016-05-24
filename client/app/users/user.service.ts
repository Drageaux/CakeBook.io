import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Headers, RequestOptions, Response} from "@angular/http";

import {User} from "./user";

@Injectable()
export class UserService {
    userProfile = {};

    constructor(private http:Http) {
        this.userProfile = this.getLocalProfile();
    }

    isLoggedIn() {
        return localStorage.getItem("id_token") != null;
    }

    getLocalProfile() {
        return JSON.parse(localStorage.getItem("profile"));
    }

    getUser(id:string):Observable<User> {
        let decodedId = decodeURIComponent(id);
        return this.http.get("/api/user/" + decodedId)
            .map(res => <User> res.json())
            .catch(this.handleError)
    }

    addUser():Observable<User> {
        if (this.userProfile == null) {
            return
        }
        let body = JSON.stringify({
            "userId": this.userProfile.user_id,
            "nickname": this.userProfile.nickname,
            "email": this.userProfile.email,
            "name": this.userProfile.name,
            "firstName": this.userProfile.given_name,
            "lastName": this.userProfile.family_name
        });
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.post("/api/user/" + this.userProfile.user_id, body, options)
            .map(res => <User> res.json())
            .catch(this.handleError)
    }

    updateImportantDetails():Observable<User> {
        if (this.userProfile == null) {
            return
        }
        let body = JSON.stringify({
            "userId": this.userProfile.user_id,
            "email": this.userProfile.email,
            "nickname": this.userProfile.nickname
        });
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({headers: headers});

        return this.http.put("/api/user/" + this.userProfile.user_id, body, options)
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