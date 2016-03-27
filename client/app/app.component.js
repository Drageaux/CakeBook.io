System.register(["angular2/core", "angular2/http", 'angular2/router', "angular2-jwt", "./loggedin-outlet", "./login.component", "./home.component", "./cakes/cake-details.component", "./cakes/add-cake-form.component", "./cakes/cake.service", 'angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, angular2_jwt_1, loggedin_outlet_1, login_component_1, home_component_1, cake_details_component_1, add_cake_form_component_1, cake_service_1, core_2, core_3;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (loggedin_outlet_1_1) {
                loggedin_outlet_1 = loggedin_outlet_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (cake_details_component_1_1) {
                cake_details_component_1 = cake_details_component_1_1;
            },
            function (add_cake_form_component_1_1) {
                add_cake_form_component_1 = add_cake_form_component_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            },
            function (core_3_1) {
                core_3 = core_3_1;
            }],
        execute: function() {
            core_3.enableProdMode();
            AppComponent = (function () {
                function AppComponent(authHttp, _router, _location) {
                    this.authHttp = authHttp;
                    this._router = _router;
                    this._location = _location;
                }
                AppComponent.prototype.ngOnInit = function () {
                    if (!angular2_jwt_1.tokenNotExpired()) {
                        this._router.navigate(["Login"]);
                    }
                    var displayBackToTop = this.displayBackToTop.bind(this);
                    document.onscroll = function () {
                        displayBackToTop(window.scrollY);
                    };
                };
                AppComponent.prototype.logout = function () {
                    localStorage.removeItem('profile');
                    localStorage.removeItem('id_token');
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
                    return angular2_jwt_1.tokenNotExpired();
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
                        template: "\n        <nav *ngIf=\"loggedIn() && !atLoginPage()\" class=\"navbar navbar-default topnav\">\n            <!--<a href=\"#\" class=\"navbar-brand\">Cake Book</a>-->\n\n            <!-- Normal Menu -->\n            <ul class=\"nav navbar-nav navbar-right\" id=\"normalMenu\">\n                <li>\n                    <a class=\"navbar-item\" [routerLink]=\"['Home']\">\n                        <span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>&nbsp;Home&nbsp;\n                    </a>\n                </li>\n                <li>\n                    <a class=\"navbar-item\" href=\"#\">\n                        <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>&nbsp;Profile&nbsp;\n                    </a>\n                </li>\n                <li>\n                    <a class=\"navbar-item\" href=\"#\">\n                        <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>&nbsp;Settings&nbsp;\n                    </a>\n                </li>\n                <li>\n                    <a class=\"navbar-item\" (click)=\"logout()\">\n                        <span class=\"glyphicon glyphicon-log-out\" aria-hidden=\"true\"></span>&nbsp;Logout&nbsp;\n                    </a>\n                </li>\n            </ul>\n\n            <!-- Dropdown Menu -->\n            <div class=\"btn-group\" id=\"dropdownMenu\">\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                    <span class=\"glyphicon glyphicon-list\"></span>\n                </button>\n                <ul class=\"dropdown-menu dropdown-menu-right\">\n                    <li>\n                        <a class=\"navbar-item\" [routerLink]=\"['Home']\">\n                            <span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>&nbsp;Home&nbsp;\n                        </a>\n                    </li>\n                    <li>\n                        <a class=\"navbar-item\" href=\"#\">\n                            <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>&nbsp;Profile&nbsp;\n                        </a>\n                    </li>\n                    <li>\n                        <a class=\"navbar-item\" href=\"#\">\n                            <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>&nbsp;Settings&nbsp;\n                        </a>\n                    </li>\n                    <li>\n                        <a class=\"navbar-item\" (click)=\"logout()\">\n                            <span class=\"glyphicon glyphicon-log-out\" aria-hidden=\"true\"></span>&nbsp;Logout&nbsp;\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </nav>\n\n        <div [class.wrapper]=\"loggedIn() && !atLoginPage()\">\n            <loggedin-router-outlet></loggedin-router-outlet>\n            <nav *ngIf=\"loggedIn() && !atLoginPage()\">\n                <button class=\"back-to-top\" id=\"backToTop\" style=\"display: none\" (click)=\"scrollBackToTop()\">\n                    <span class=\"glyphicon glyphicon-chevron-up\" aria-hidden=\"true\"></span>\n                </button>\n            </nav>\n        </div>\n\n        <div *ngIf=\"loggedIn() && atLoginPage()\">\n            <a class=\"btn btn-primary\" id=\"redirect-button\" href=\"/home\">Login Successful<br>(click here)</a>\n        </div>\n\t\t",
                        styleUrls: ["assets/custom/stylesheets/style.css"],
                        encapsulation: core_2.ViewEncapsulation.None,
                        providers: [
                            cake_service_1.CakeService,
                            router_1.ROUTER_PROVIDERS,
                            http_1.HTTP_PROVIDERS
                        ],
                        directives: [router_1.ROUTER_DIRECTIVES, loggedin_outlet_1.LoggedInRouterOutlet]
                    }),
                    router_1.RouteConfig([
                        { path: "/login", name: "Login", component: login_component_1.LoginComponent, useAsDefault: true },
                        { path: "/home", name: "Home", component: home_component_1.HomeComponent },
                        { path: "/cake/:id", name: "CakeDetails", component: cake_details_component_1.CakeDetailsComponent },
                        { path: "/addCakeForm", name: "AddCakeForm", component: add_cake_form_component_1.AddCakeFormComponent }
                    ]), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, router_1.Router, router_1.Location])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map