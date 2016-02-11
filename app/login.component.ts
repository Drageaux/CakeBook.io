import {Component} from 'angular2/core';
import {Location, RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {OnInit} from "angular2/core";

declare var Auth0Lock;

@Component({
    templateUrl: "assets/templates/login.component.html"
})

export class LoginComponent implements OnInit {
    lock = new Auth0Lock('1w9uIYPLBxZzbciPImlhyG39EPDqzv8e', 'drageaux.auth0.com');

    constructor(private _router:Router,
                private _location:Location) {
    }

    ngOnInit() {
        if (this.loggedIn()) {
            this._router.navigate(["Home"]);
        }
    }

    login() {
        this.lock.show(function (err:string, profile:string, id_token:string) {
            if (err) {
                throw new Error(err);
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
        });
    }

    loggedIn() {
        return tokenNotExpired();
    }

}