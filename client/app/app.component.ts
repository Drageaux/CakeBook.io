import {Component, provide, OnInit} from "angular2/core";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {Location, RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {AuthHttp, tokenNotExpired, JwtHelper, AuthConfig} from "angular2-jwt";

// in-memory web api imports
import {XHRBackend} from "angular2/http";
import {InMemoryBackendService, SEED_DATA} from 'a2-in-memory-web-api/core';

import {LoggedInRouterOutlet} from "./loggedin-outlet";
import {LoginComponent}         from "./login.component";
import {HomeComponent}          from "./home.component";
import {ProfileComponent}       from "./profile.component";
import {Cake}                   from "./cakes/cake";
import {CakeData}               from "./cakes/cake-data";
import {CakeDetailComponent}    from "./cakes/cake-detail.component";
import {CakeService}            from "./cakes/cake.service";

// Need to be imported later on for some reason
import {ViewEncapsulation}        from "angular2/core";
import {enableProdMode} from 'angular2/core';
enableProdMode();


@Component({
    selector: 'my-app',
    template: `
        <div *ngIf="loggedIn() && !atLoginPage()">
            <nav class="navbar navbar-default navbar-fixed-top topnav">

                <!-- Normal Menu -->
                <ul class="nav navbar-nav navbar-right" id="normalMenu">
                    <li>
                        <a class="navbar-item" [routerLink]="['Home']">
                            <span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;Home&nbsp;
                        </a>
                    </li>
                    <li>
                        <a class="navbar-item" [routerLink]="['Cakes']">
                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;Profile&nbsp;
                        </a>
                    </li>
                    <li>
                        <a class="navbar-item" href="#">
                            <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>&nbsp;Settings&nbsp;
                        </a>
                    </li>
                    <li>
                        <a class="navbar-item" (click)="logout()">
                            <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>&nbsp;Logout&nbsp;
                        </a>
                    </li>
                </ul>

                <!-- Dropdown Menu -->
                <div class="btn-group" id="dropdownMenu">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="glyphicon glyphicon-list"></span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li>
                            <a class="navbar-item" [routerLink]="['Home']">
                                <span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;Home&nbsp;
                            </a>
                        </li>
                        <li>
                            <a class="navbar-item" [routerLink]="['Cakes']">
                                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;Profile&nbsp;
                            </a>
                        </li>
                        <li>
                            <a class="navbar-item" href="#">
                                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>&nbsp;Settings&nbsp;
                            </a>
                        </li>
                        <li>
                            <a class="navbar-item" (click)="logout()">
                                <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>&nbsp;Logout&nbsp;
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        <router-outlet></router-outlet>
		`,
    styleUrls: ["assets/custom/stylesheets/style.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        CakeService,
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS
    ],
    directives: [ROUTER_DIRECTIVES, LoggedInRouterOutlet]
})

@RouteConfig([
    {path: "/login", name: "Login", component: LoginComponent, useAsDefault: true},
    {path: "/...", redirectTo: ['/Login']},
    {path: "/home", name: "Home", component: HomeComponent},
    {path: "/cakes", name: "Cakes", component: ProfileComponent},
    {path: "/cake/:id", name: "CakeDetail", component: CakeDetailComponent}
])

export class AppComponent {
    constructor(public authHttp:AuthHttp,
                private http:Http,
                private _router:Router,
                private _location:Location) {
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this._router.navigate(["Login"]);
    }

    loggedIn() {
        return tokenNotExpired();
    }

    atLoginPage() {
        return this._location.path() == "/login";
    }

    /* Template for Getting Things */
    getSecretThing() {
        this.authHttp.get('http://example.com/api/secretthing')
            .subscribe(
                data => console.log(data.json()),
                err => console.log(err),
                () => console.log('Complete')
            );
    }
}

