import {Component, provide, OnInit} from "angular2/core";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {Location,
    RouteConfig,
    Router,
    APP_BASE_HREF,
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES,
    CanActivate} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {AuthHttp,
    tokenNotExpired,
    JwtHelper,
    AuthConfig} from "angular2-jwt";

import {LoggedInRouterOutlet}   from "./loggedin-outlet";
import {LoginComponent}         from "./login.component";
import {HomeComponent}          from "./home.component";

import {Cake}                   from "./cakes/cake";
import {CakeDetailsComponent}    from "./cakes/cake-details.component";
import {AddCakeFormComponent}   from "./cakes/add-cake-form.component";
import {CakeService}            from "./cakes/cake.service";

// Need to be imported later on for some reason
import {ViewEncapsulation}      from "angular2/core";
import {enableProdMode}         from 'angular2/core';
enableProdMode();

@Component({
    selector: 'my-app',
    template: `
        <nav *ngIf="loggedIn() && !atLoginPage()" class="navbar navbar-default topnav">
            <!--<a href="#" class="navbar-brand">Cake Book</a>-->

            <!-- Normal Menu -->
            <ul class="nav navbar-nav navbar-right" id="normalMenu">
                <li>
                    <a class="navbar-item" [routerLink]="['Home']">
                        <span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;Home&nbsp;
                    </a>
                </li>
                <li>
                    <a class="navbar-item" href="#">
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
                        <a class="navbar-item" href="#">
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

        <div [class.wrapper]="loggedIn() && !atLoginPage()">
            <loggedin-router-outlet></loggedin-router-outlet>
            <nav *ngIf="loggedIn() && !atLoginPage()">
                <button class="back-to-top" id="backToTop" style="display: none" (click)="scrollBackToTop()">
                    <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                </button>
            </nav>
        </div>
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
    {path: "/home", name: "Home", component: HomeComponent},
    {path: "/cake/:id", name: "CakeDetails", component: CakeDetailsComponent},
    {path: "/addCakeForm", name: "AddCakeForm", component: AddCakeFormComponent}
])

export class AppComponent implements OnInit {

    constructor(public authHttp:AuthHttp,
                private _router:Router,
                private _location:Location) {
    }

    ngOnInit() {
        if (!tokenNotExpired()) {
            this._router.navigate(["Login"]);
        }

        let displayBackToTop = this.displayBackToTop.bind(this);
        document.onscroll = function () {
            displayBackToTop(window.scrollY);
        }
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this._router.navigate(["Login"]);
    }

    /*****************
     * Scrolling Nav *
     *****************/
    displayBackToTop(value:number) {
        if (document.getElementById("backToTop")) {
            if (value > 70) {
                document.getElementById("backToTop").style.display = "block";
            } else {
                document.getElementById("backToTop").style.display = "none";
            }
        }
    }

    scrollBackToTop() {
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 0);
        return;
    }

    /********************
     * Helper Functions *
     ********************/
    loggedIn() {
        return tokenNotExpired();
    }

    atLoginPage() {
        return this._location.path() == "/login";
    }

    /* Template for Getting Things Auth0 */
    getSecretThing() {
        this.authHttp.get('http://example.com/api/secretthing')
            .subscribe(
                data => console.log(data.json()),
                err => console.log(err),
                () => console.log('Complete')
            );
    }
}

