import {Component, provide} from "angular2/core";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {AuthHttp, tokenNotExpired, JwtHelper, AuthConfig} from "angular2-jwt";
// in-memory web api imports
import {XHRBackend} from "angular2/http";
import {InMemoryBackendService, SEED_DATA} from 'a2-in-memory-web-api/core';

import {LoginComponent}         from "./login.component";
import {HomeComponent}          from "./home.component";
import {ProfileComponent}       from "./profile.component";
import {Cake}                   from "./cakes/cake";
import {CakeData}               from "./cakes/cake-data";
import {CakeDetailComponent}    from "./cakes/cake-detail.component";
import {CakeService}            from "./cakes/cake.service";

// Need to be imported later on for some reason
import {ViewEncapsulation}        from "angular2/core";

declare var Auth0Lock;

@Component({
    selector: 'my-app',
    template: `

        <div *ngIf="!loggedIn()" class="login-container">
            <h1>Welcome to Angular2 with Auth0</h1>
            <button *ngIf="!loggedIn()" (click)="login()">Login</button>
            <button *ngIf="loggedIn()" (click)="logout()">Logout</button>
        </div>

        <div *ngIf="loggedIn()">
            <nav class="navbar navbar-default navbar-fixed-top">
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
            </nav>
            <router-outlet></router-outlet>
        </div>
		`,
    styleUrls: ["assets/stylesheets/style.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        HTTP_PROVIDERS,
        CakeService,
        // in-memory web api providers
        provide(XHRBackend, {useClass: InMemoryBackendService}), // in-mem server
        provide(SEED_DATA, {useClass: CakeData}), // in-mem server data
        provide(AuthHttp, {
            useFactory: (http) => {
                return new AuthHttp(new AuthConfig(), http);
            },
            deps: [Http]
        })
    ],
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    //{path: "/login", name: "Login", component: LoginComponent},
    {path: "/...", redirectTo: ['/Home']},
    {path: "/", redirectTo: ['/Home']},
    {path: "/home", name: "Home", component: HomeComponent, useAsDefault: true},
    {path: "/cakes", name: "Cakes", component: ProfileComponent},
    {path: "/cake/:id", name: "CakeDetail", component: CakeDetailComponent}
])

export class AppComponent {
    lock = new Auth0Lock('1w9uIYPLBxZzbciPImlhyG39EPDqzv8e', 'drageaux.auth0.com');

    constructor(public authHttp:AuthHttp, private http:Http, private _router:Router) {
    }

    login() {
        this.lock.show(
            function (err:string, profile:string, id_token:string) {
                if (err) {
                    throw new Error(err);
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                localStorage.setItem('id_token', id_token);
            });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }

    loggedIn() {
        return tokenNotExpired();
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

