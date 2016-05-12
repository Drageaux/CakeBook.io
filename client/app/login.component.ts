import {Component, OnInit} from 'angular2/core';
import {RouteConfig, Router, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from 'angular2/router';
import {Location, APP_BASE_HREF} from "angular2/platform/common";

import {HomeComponent} from "./home.component";
import {UserService} from "./users/user.service";

declare var Auth0Lock;

@Component({
    templateUrl: "templates/login.component.html"
})

export class LoginComponent implements OnInit {
    lock = new Auth0Lock('1w9uIYPLBxZzbciPImlhyG39EPDqzv8e', 'drageaux.auth0.com');

    constructor(private _router:Router,
                private _location:Location,
                private _userService:UserService) {
    }

    ngOnInit() {
        if (this.loggedIn()) {
            this._userService.getUser()
                .subscribe(res => {
                    if (res == null) {
                        this._userService.addUser()
                            .subscribe(() => this._router.navigate(["Home"]))
                    }
                    else {
                        this._router.navigate(["Home"]);
                    }
                });
        }
    }

    login() {
        this.lock.show(
            function (err:string, profile:string, id_token:string) {
                if (err) {
                    throw new Error(err);
                }
                localStorage.setItem('profile', JSON.stringify(profile));
                localStorage.setItem('id_token', id_token);
                window.location.reload();
            });
    }

    loggedIn() {
        return this._userService.isLoggedIn()
    }

    atLoginPage() {
        return this._location.path() == "/login";
    }
}