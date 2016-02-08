System.register(['angular2/core', "angular2/router", "./cakes/cake.service", "./add-cake-form.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, cake_service_1, add_cake_form_component_1;
    var ProfileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            },
            function (add_cake_form_component_1_1) {
                add_cake_form_component_1 = add_cake_form_component_1_1;
            }],
        execute: function() {
            ProfileComponent = (function () {
                function ProfileComponent(_router, _cakeService) {
                    this._router = _router;
                    this._cakeService = _cakeService;
                }
                ProfileComponent.prototype.ngOnInit = function () {
                    this.getCakes();
                };
                ProfileComponent.prototype.getCakes = function () {
                    var _this = this;
                    this._cakeService.getCakes()
                        .subscribe(function (cakes) { return _this.cakes = cakes; }, function (error) { return _this.errorMessage = error; });
                };
                ProfileComponent.prototype.onSelect = function (cake) {
                    this._router.navigate(["CakeDetail", { id: cake.id }]);
                };
                ProfileComponent.prototype.addCake = function (name) {
                    var _this = this;
                    if (!name) {
                        return;
                    }
                    this._cakeService.addCake(name)
                        .subscribe(function (cake) { return _this.cakes.push(cake); }, function (error) { return _this.errorMessage = error; });
                };
                ProfileComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div class=\"general-container\">\n            <h2>Caker Profile</h2>\n            <h3>My Cakes</h3>\n            <ul>\n                <li>\n                    <input #newCake>\n                    <button (click)=\"addCake(newCake.value); newCake.value=''\">\n                        Add Cake\n                    </button>\n                    <div class=\"error\" *ngIf=\"errorMessage\">\n                        {{errorMessage}}\n                    </div>\n                </li>\n                <li *ngFor=\"#cake of cakes\"\n                    (click)=\"onSelect(cake)\">\n                    <a class=\"url-list-item\">{{cake.name}}</a>\n                </li>\n            </ul>\n        </div>\n        ",
                        styles: ["\n        .error {\n            color:red:\n        }\n        "],
                        directives: [add_cake_form_component_1.AddCakeFormComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, cake_service_1.CakeService])
                ], ProfileComponent);
                return ProfileComponent;
            })();
            exports_1("ProfileComponent", ProfileComponent);
        }
    }
});
//# sourceMappingURL=profile.component.js.map