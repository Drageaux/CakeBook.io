System.register(["angular2/core", "angular2/http", 'angular2/router', "angular2-jwt", 'a2-in-memory-web-api/core', "./login.component", "./home.component", "./profile.component", "./cakes/cake-data", "./cakes/cake-detail.component", "./cakes/cake.service", "./loggedin-outlet"], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, angular2_jwt_1, http_2, core_2, login_component_1, home_component_1, profile_component_1, cake_data_1, cake_detail_component_1, cake_service_1, core_3, loggedin_outlet_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_3 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            },
            function (cake_data_1_1) {
                cake_data_1 = cake_data_1_1;
            },
            function (cake_detail_component_1_1) {
                cake_detail_component_1 = cake_detail_component_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            },
            function (loggedin_outlet_1_1) {
                loggedin_outlet_1 = loggedin_outlet_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(authHttp, http, _router, _location) {
                    this.authHttp = authHttp;
                    this.http = http;
                    this._router = _router;
                    this._location = _location;
                }
                AppComponent.prototype.logout = function () {
                    localStorage.removeItem('profile');
                    localStorage.removeItem('id_token');
                    this._router.navigate(["Login"]);
                };
                AppComponent.prototype.loggedIn = function () {
                    console.log(angular2_jwt_1.tokenNotExpired() && this._location.path() != "/login");
                    return angular2_jwt_1.tokenNotExpired();
                };
                AppComponent.prototype.atLoginPage = function () {
                    return this._location.path() == "/login";
                };
                /* Template for Getting Things */
                AppComponent.prototype.getSecretThing = function () {
                    this.authHttp.get('http://example.com/api/secretthing')
                        .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <div *ngIf=\"loggedIn() && !atLoginPage()\">\n            <nav class=\"navbar navbar-default navbar-fixed-top navtop\">\n                <!-- Normal Menu -->\n                <ul class=\"nav navbar-nav navbar-right\" id=\"normalMenu\">\n                    <li>\n                        <a class=\"navbar-item\" [routerLink]=\"['Home']\">\n                            <span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>&nbsp;Home&nbsp;\n                        </a>\n                    </li>\n                    <li>\n                        <a class=\"navbar-item\" [routerLink]=\"['Cakes']\">\n                            <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>&nbsp;Profile&nbsp;\n                        </a>\n                    </li>\n                    <li>\n                        <a class=\"navbar-item\" href=\"#\">\n                            <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>&nbsp;Settings&nbsp;\n                        </a>\n                    </li>\n                    <li>\n                        <a class=\"navbar-item\" (click)=\"logout()\">\n                            <span class=\"glyphicon glyphicon-log-out\" aria-hidden=\"true\"></span>&nbsp;Logout&nbsp;\n                        </a>\n                    </li>\n                </ul>\n            </nav>\n        </div>\n\n        <router-outlet></router-outlet>\n\t\t",
                        styleUrls: ["assets/stylesheets/style.css"],
                        encapsulation: core_3.ViewEncapsulation.None,
                        providers: [
                            cake_service_1.CakeService,
                            router_1.ROUTER_PROVIDERS,
                            http_1.HTTP_PROVIDERS,
                            // in-memory web api providers
                            core_1.provide(http_2.XHRBackend, { useClass: core_2.InMemoryBackendService }),
                            core_1.provide(core_2.SEED_DATA, { useClass: cake_data_1.CakeData }),
                        ],
                        directives: [router_1.ROUTER_DIRECTIVES, loggedin_outlet_1.LoggedInRouterOutlet]
                    }),
                    router_1.RouteConfig([
                        { path: "/login", name: "Login", component: login_component_1.LoginComponent, useAsDefault: true },
                        { path: "/...", redirectTo: ['/Login'] },
                        { path: "/home", name: "Home", component: home_component_1.HomeComponent },
                        { path: "/cakes", name: "Cakes", component: profile_component_1.ProfileComponent },
                        { path: "/cake/:id", name: "CakeDetail", component: cake_detail_component_1.CakeDetailComponent }
                    ]), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, http_1.Http, router_1.Router, router_1.Location])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map