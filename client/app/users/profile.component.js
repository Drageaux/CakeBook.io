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
var user_service_1 = require("./user.service");
var cake_service_1 = require("../cakes/cake.service");
var ProfileComponent = (function () {
    function ProfileComponent(router, routeParams, userService, cakeService) {
        this.router = router;
        this.routeParams = routeParams;
        this.userService = userService;
        this.cakeService = cakeService;
        this.localProfile = {};
        this.user = {};
        this.cakes = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(["Login"]);
        }
        else {
            this.localProfile = this.userService.getLocalProfile();
            this.userService.getUser(this.routeParams.get("user"))
                .subscribe(function (user) {
                _this.user = user;
                _this.cakeService.getCakes(_this.user.userId)
                    .subscribe(function (cakes) { return _this.cakes = cakes; });
            });
        }
    };
    ProfileComponent.prototype.isMyPage = function () {
        var decodedParams = decodeURIComponent(this.routeParams.get("user"));
        return (this.localProfile.user_id === decodedParams);
    };
    ProfileComponent.prototype.isEmptyString = function (str) {
        return str == "" || str == null;
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: "profile",
            templateUrl: "templates/profile.component.html"
        }),
        router_deprecated_1.CanActivate(function () { return localStorage.getItem("id_token"); }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, user_service_1.UserService, cake_service_1.CakeService])
    ], ProfileComponent);
    return ProfileComponent;
})();
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map