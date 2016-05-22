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
var router_deprecated_1 = require("@angular/router-deprecated");
var common_1 = require("@angular/common");
var user_service_1 = require("./users/user.service");
var LoginComponent = (function () {
    function LoginComponent(_router, _location, _userService) {
        this._router = _router;
        this._location = _location;
        this._userService = _userService;
        this.lock = new Auth0Lock('1w9uIYPLBxZzbciPImlhyG39EPDqzv8e', 'drageaux.auth0.com');
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.loggedIn()) {
            this._userService.getUser()
                .subscribe(function (res) {
                if (res == null) {
                    _this._userService.addUser()
                        .subscribe(function () { return _this._router.navigate(["Home"]); });
                }
                else {
                    _this._router.navigate(["Home"]);
                }
            });
        }
    };
    LoginComponent.prototype.login = function () {
        this.lock.show(function (err, profile, id_token) {
            if (err) {
                throw new Error(err);
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
            window.location.reload();
        });
    };
    LoginComponent.prototype.loggedIn = function () {
        return this._userService.isLoggedIn();
    };
    LoginComponent.prototype.atLoginPage = function () {
        return this._location.path() == "/login";
    };
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: "templates/login.component.html"
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, common_1.Location, user_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
})();
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map