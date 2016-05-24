import {Component, provide, OnInit} from "@angular/core";
import {HTTP_PROVIDERS, Http} from "@angular/http";

import {
    RouteConfig,
    Router,
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES,
    CanActivate} from '@angular/router-deprecated';
import {Location, APP_BASE_HREF} from "@angular/common";
import {FORM_PROVIDERS} from '@angular/common';
import {AuthHttp} from "angular2-jwt";

import {LoggedInRouterOutlet}   from "./loggedin-outlet";
import {LoginComponent}         from "./login.component";
import {HomeComponent}          from "./home.component";
import {SearchComponent}        from "./cakes/search.component";

import {ProfileComponent}       from "./users/profile.component";
import {UserService}            from "./users/user.service";

import {Cake}                   from "./cakes/cake";
import {CakeDetailsComponent}   from "./cakes/cake-details.component";
import {AddCakeFormComponent}   from "./cakes/add-cake-form.component";
import {CakeService}            from "./cakes/cake.service";
import {TransitionService}      from "./transition.service";

// Need to be imported later on for some reason
import {ViewEncapsulation}      from "@angular/core";
import {enableProdMode}         from "@angular/core";
import {User} from "./users/user";
enableProdMode();

@Component({
    selector: 'my-app',
    templateUrl: "templates/app.component.html",
    styleUrls: ["assets/custom/stylesheets/style.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        UserService,
        CakeService,
        TransitionService,
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS
    ],
    directives: [ROUTER_DIRECTIVES, LoggedInRouterOutlet]
})

@RouteConfig([
    {path: "/login", name: "Login", component: LoginComponent},
    {path: "/home", name: "Home", component: HomeComponent, useAsDefault: true},
    {path: "/profile/:user", name: "Profile", component: ProfileComponent},
    {path: "/cake/:id", name: "CakeDetails", component: CakeDetailsComponent},
    {path: "/search/query/:query/start/:start/end/:end", name: "Search", component: SearchComponent}
])

export class AppComponent implements OnInit {
    localProfile = {};

    constructor(public authHttp:AuthHttp,
                private _router:Router,
                private _location:Location,
                private _userService:UserService) {
    }

    ngOnInit() {
        if (!this.loggedIn()) {
            this._router.navigate(["Login"]);
        } else {
            this.localProfile = this._userService.getLocalProfile();
            // if logged in, update if missing info
            this._userService.getUser(this.localProfile.user_id)
                .subscribe(res => {
                    if (res == null) {
                        this._userService.addUser()
                            .subscribe(res => console.log("New User: " + res));
                    } else {
                        this._userService.updateImportantDetails()
                            .subscribe(res => console.log("Updated user information"));
                    }
                });
        }

        // back-to-top button
        let displayBackToTop = this.displayBackToTop.bind(this);
        document.onscroll = function () {
            displayBackToTop(window.scrollY);
        }
    }

    goToProfile() {
        this._userService.getUser(this.localProfile.user_id)
            .subscribe(res => this._router.navigate(["Profile", {
               user: res.userId
            }]))
    }

    logout() {
        localStorage.removeItem("profile");
        localStorage.removeItem("id_token");
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
        return localStorage.getItem("id_token") != null;
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

