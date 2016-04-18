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
import {SearchComponent}        from "./cakes/search.component";

import {Cake}                   from "./cakes/cake";
import {CakeDetailsComponent}   from "./cakes/cake-details.component";
import {AddCakeFormComponent}   from "./cakes/add-cake-form.component";
import {CakeService}            from "./cakes/cake.service";

// Need to be imported later on for some reason
import {ViewEncapsulation}      from "angular2/core";
import {enableProdMode}         from 'angular2/core';
enableProdMode();

@Component({
    selector: 'my-app',
    templateUrl: "templates/app.component.html",
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
    {path: "/login", name: "Login", component: LoginComponent},
    {path: "/home", name: "Home", component: HomeComponent, useAsDefault: true},
    {path: "/cake/:id", name: "CakeDetails", component: CakeDetailsComponent},
    {path: "/search/query/:query/start/:start/end/:end", name: "Search", component: SearchComponent}
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

