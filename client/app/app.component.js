var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require("@angular/common");
var angular2_jwt_1 = require("angular2-jwt");
var loggedin_outlet_1 = require("./loggedin-outlet");
var login_component_1 = require("./login.component");
var home_component_1 = require("./home.component");
var search_component_1 = require("./cakes/search.component");
var profile_component_1 = require("./users/profile.component");
var user_service_1 = require("./users/user.service");
var cake_details_component_1 = require("./cakes/cake-details.component");
var cake_service_1 = require("./cakes/cake.service");
var transition_service_1 = require("./transition.service");
// Need to be imported later on for some reason
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
core_3.enableProdMode();
var AppComponent = (function () {
    function AppComponent(authHttp, _router, _location, _userService) {
        this.authHttp = authHttp;
        this._router = _router;
        this._location = _location;
        this._userService = _userService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.loggedIn()) {
            this._router.navigate(["Login"]);
        }
        else {
            // if logged in, update if missing info
            this._userService.getUser()
                .subscribe(function (res) {
                if (res == null) {
                    _this._userService.addUser()
                        .subscribe(function (res) { return console.log("New User: " + res); });
                }
                else {
                    _this._userService.updateImportantDetails()
                        .subscribe(function (res) { return console.log("Updated user information"); });
                }
            });
        }
        // back-to-top button
        var displayBackToTop = this.displayBackToTop.bind(this);
        document.onscroll = function () {
            displayBackToTop(window.scrollY);
        };
    };
    AppComponent.prototype.goToProfile = function () {
        var _this = this;
        this._userService.getUser()
            .subscribe(function (res) { return _this._router.navigate(["Profile", {
                user: res.userId
            }]); });
    };
    AppComponent.prototype.logout = function () {
        localStorage.removeItem("profile");
        localStorage.removeItem("id_token");
        this._router.navigate(["Login"]);
    };
    /*****************
     * Scrolling Nav *
     *****************/
    AppComponent.prototype.displayBackToTop = function (value) {
        if (document.getElementById("backToTop")) {
            if (value > 70) {
                document.getElementById("backToTop").style.display = "block";
            }
            else {
                document.getElementById("backToTop").style.display = "none";
            }
        }
    };
    AppComponent.prototype.scrollBackToTop = function () {
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 0);
        return;
    };
    /********************
     * Helper Functions *
     ********************/
    AppComponent.prototype.loggedIn = function () {
        return localStorage.getItem("id_token") != null;
    };
    AppComponent.prototype.atLoginPage = function () {
        return this._location.path() == "/login";
    };
    /* Template for Getting Things Auth0 */
    AppComponent.prototype.getSecretThing = function () {
        this.authHttp.get('http://example.com/api/secretthing')
            .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: "templates/app.component.html",
            styleUrls: ["assets/custom/stylesheets/style.css"],
            encapsulation: core_2.ViewEncapsulation.None,
            providers: [
                user_service_1.UserService,
                cake_service_1.CakeService,
                transition_service_1.TransitionService,
                router_deprecated_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS
            ],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, loggedin_outlet_1.LoggedInRouterOutlet]
        }),
        router_deprecated_1.RouteConfig([
            { path: "/login", name: "Login", component: login_component_1.LoginComponent },
            { path: "/home", name: "Home", component: home_component_1.HomeComponent, useAsDefault: true },
            { path: "/profile/:user", name: "Profile", component: profile_component_1.ProfileComponent },
            { path: "/cake/:id", name: "CakeDetails", component: cake_details_component_1.CakeDetailsComponent },
            { path: "/search/query/:query/start/:start/end/:end", name: "Search", component: search_component_1.SearchComponent }
        ]), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, router_deprecated_1.Router, common_1.Location, user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map