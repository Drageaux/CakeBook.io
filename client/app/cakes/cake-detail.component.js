System.register(["angular2/core", "angular2/router", "./cake", "./cake.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, router_2, cake_1, cake_service_1;
    var CakeDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (cake_1_1) {
                cake_1 = cake_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            }],
        execute: function() {
            CakeDetailComponent = (function () {
                function CakeDetailComponent(_router, _routeParams, _service) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._service = _service;
                }
                CakeDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    this._service.getCake(id)
                        .subscribe(function (cake) { return _this.cake = cake; }, function (error) { return _this.errorMessage = error; });
                };
                CakeDetailComponent.prototype.addIngredient = function () {
                    if (!this.isEmptyString(this.currIngr)) {
                        console.log(this.currIngr);
                    }
                };
                CakeDetailComponent.prototype.addStep = function () {
                    if (!this.isEmptyString(this.currStep)) {
                        console.log(this.currStep);
                    }
                };
                CakeDetailComponent.prototype.deleteCake = function (id) {
                    var _this = this;
                    this._service.deleteCake(id)
                        .subscribe(function (res) { return _this._router.navigate(["Home"]); });
                };
                CakeDetailComponent.prototype.isEmptyString = function (str) {
                    return str == "" || str == null;
                };
                CakeDetailComponent.prototype.gotoCakes = function () {
                    this._router.navigate(["Home"]);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], CakeDetailComponent.prototype, "errorMessage", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', cake_1.Cake)
                ], CakeDetailComponent.prototype, "cake", void 0);
                CakeDetailComponent = __decorate([
                    core_1.Component({
                        selector: "cake-detail",
                        templateUrl: "templates/cake-detail.component.html"
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_2.RouteParams, cake_service_1.CakeService])
                ], CakeDetailComponent);
                return CakeDetailComponent;
            })();
            exports_1("CakeDetailComponent", CakeDetailComponent);
        }
    }
});
//# sourceMappingURL=cake-detail.component.js.map