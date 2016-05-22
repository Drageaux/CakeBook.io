/**
 * Code from Auth0's Angular 2 Authentication on GitHub
 * https://github.com/auth0/angular2-authentication-sample/tree/master/src
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var angular2_jwt_1 = require("angular2-jwt");
var core_2 = require("@angular/core");
var LoggedInRouterOutlet = (function (_super) {
    __extends(LoggedInRouterOutlet, _super);
    function LoggedInRouterOutlet(_viewContainerRef, _loader, _parentRouter, nameAttr) {
        _super.call(this, _viewContainerRef, _loader, _parentRouter, nameAttr);
        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/login': true
        };
    }
    LoggedInRouterOutlet.prototype.activate = function (instruction) {
        var url = this.parentRouter.lastNavigationAttempt;
        if (!this.publicRoutes[url] && !localStorage.getItem('id_token')) {
            // todo: redirect to Login, may be there a better way?
            this.parentRouter.navigateByUrl('/login');
        }
        return _super.prototype.activate.call(this, instruction);
    };
    LoggedInRouterOutlet = __decorate([
        core_1.Directive({
            selector: 'loggedin-router-outlet'
        }),
        router_deprecated_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }),
        __param(3, core_1.Attribute('name')), 
        __metadata('design:paramtypes', [core_2.ViewContainerRef, core_1.DynamicComponentLoader, router_deprecated_1.Router, String])
    ], LoggedInRouterOutlet);
    return LoggedInRouterOutlet;
})(router_deprecated_1.RouterOutlet);
exports.LoggedInRouterOutlet = LoggedInRouterOutlet;
//# sourceMappingURL=loggedin-outlet.js.map