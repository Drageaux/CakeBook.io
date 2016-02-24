System.register(['angular2/core', "angular2/router", "./cakes/cake.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, cake_service_1;
    var HomeComponent;
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
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(_location, _router, _cakeService) {
                    this._location = _location;
                    this._router = _router;
                    this._cakeService = _cakeService;
                }
                HomeComponent.prototype.ngOnInit = function () {
                    this.getCakes();
                };
                HomeComponent.prototype.getCakes = function () {
                    var _this = this;
                    this._cakeService.getCakes()
                        .subscribe(function (cakes) { return _this.cakes = cakes; }, function (error) { return _this.errorMessage = error; });
                };
                HomeComponent.prototype.onSelect = function (cake) {
                    this._router.navigate(["CakeDetail", { id: cake._id }]);
                };
                HomeComponent.prototype.addCake = function (name) {
                    var _this = this;
                    if (!name) {
                        return;
                    }
                    this._cakeService.addCake(name)
                        .subscribe(function (cake) { return _this.cakes.push(cake) && console.log(cake); }, function (error) { return _this.errorMessage = error; });
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div class=\"general-container\">\n            <h2>Home</h2>\n            <h3>My Cakes</h3>\n            <ul>\n                <li>\n                    <input #newCake>\n                    <button (click)=\"addCake(newCake.value); newCake.value=''\">\n                        Add Cake\n                    </button>\n                    <div class=\"error\" *ngIf=\"errorMessage\">\n                        {{errorMessage}}\n                    </div>\n                </li>\n                <li *ngFor=\"#cake of cakes\"\n                    (click)=\"onSelect(cake)\">\n                    <a class=\"url-list-item\">{{cake.name}}</a>\n                </li>\n            </ul>\n        </div>\n        ",
                    }), 
                    __metadata('design:paramtypes', [router_1.Location, router_1.Router, cake_service_1.CakeService])
                ], HomeComponent);
                return HomeComponent;
            })();
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map