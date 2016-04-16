System.register(['angular2/core', "angular2/router", "./cakes/add-cake-form.component", "./cakes/import-cake-form.component", "./cakes/cake.service", "angular2-jwt"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, add_cake_form_component_1, import_cake_form_component_1, cake_service_1, router_2, angular2_jwt_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (add_cake_form_component_1_1) {
                add_cake_form_component_1 = add_cake_form_component_1_1;
            },
            function (import_cake_form_component_1_1) {
                import_cake_form_component_1 = import_cake_form_component_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(_router, _cakeService) {
                    this._router = _router;
                    this._cakeService = _cakeService;
                }
                HomeComponent.prototype.ngOnInit = function () {
                    if (!angular2_jwt_1.tokenNotExpired()) {
                        this._router.navigate(["Login"]);
                    }
                    this.getCakes();
                };
                HomeComponent.prototype.getCakes = function () {
                    var _this = this;
                    this._cakeService.getCakes()
                        .subscribe(function (cakes) { return _this.cakes = cakes; }, function (error) { return _this.errorMessage = error; });
                };
                HomeComponent.prototype.goSearch = function (query) {
                    if (query != "" && query != null) {
                        this._router.navigate(["Search", { query: query }]);
                    }
                };
                HomeComponent.prototype.onSelect = function (cake) {
                    this._router.navigate(["CakeDetails", { id: cake._id }]);
                };
                HomeComponent.prototype.onAdded = function (cake) {
                    this.cakes.push(cake);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], HomeComponent.prototype, "cakes", void 0);
                HomeComponent = __decorate([
                    core_1.Component({
                        templateUrl: "templates/home.component.html",
                        directives: [add_cake_form_component_1.AddCakeFormComponent, import_cake_form_component_1.ImportCakeFormComponent]
                    }),
                    router_2.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [router_1.Router, cake_service_1.CakeService])
                ], HomeComponent);
                return HomeComponent;
            })();
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map