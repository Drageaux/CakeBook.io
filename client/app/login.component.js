System.register(['angular2/core', 'angular2/router', 'angular2-jwt', "./users/user.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, angular2_jwt_1, user_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_router, _location, _userService) {
                    this._router = _router;
                    this._location = _location;
                    this._userService = _userService;
                    this.lock = new Auth0Lock('1w9uIYPLBxZzbciPImlhyG39EPDqzv8e', 'drageaux.auth0.com');
                }
                LoginComponent.prototype.ngOnInit = function () {
                    if (this.loggedIn()) {
                        this._router.navigate(["Home"]);
                    }
                };
                LoginComponent.prototype.login = function () {
                    var prof = "";
                    this.lock.show(function (err, profile, id_token) {
                        if (err) {
                            throw new Error(err);
                        }
                        //this._userService.addUser(JSON.stringify(profile));
                        //.subscribe(res => this.saved.emit(res));
                        localStorage.setItem('profile', JSON.stringify(profile));
                        localStorage.setItem('id_token', id_token);
                    });
                };
                LoginComponent.prototype.loginUser = function () {
                    this.login();
                };
                LoginComponent.prototype.loggedIn = function () {
                    return angular2_jwt_1.tokenNotExpired();
                };
                LoginComponent.prototype.atLoginPage = function () {
                    return this._location.path() == "/login";
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        templateUrl: "templates/login.component.html"
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.Location, user_service_1.UserService])
                ], LoginComponent);
                return LoginComponent;
            })();
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map