import {Http, Response} from "angular2/http";
import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";

import {User} from "./user";

@Injectable()
export class UserService {
    constructor(private http:Http) {
    }

    getUser() {

    }

    addUser(user:string) {
        console.log(user);
        return;
    }

    private handleError(error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
