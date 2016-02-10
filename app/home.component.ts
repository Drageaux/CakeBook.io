import {Component}      from 'angular2/core';
import {tokenNotExpired} from "angular2-jwt";
import {CanActivate} from "angular2/router";
import {OnInit} from "angular2/core";
import {Router} from "angular2/router";

@Component({
    templateUrl: "assets/templates/home.component.html"
})

@CanActivate(() => tokenNotExpired())
export class HomeComponent implements OnInit {

    constructor(private _router:Router) {
    }

    ngOnInit() {
        if (!tokenNotExpired()) {
            this._router.navigate(["Login"]);
        }
    }
}
