System.register(['angular2/core', "./top-nav.component", "./cakes/cake-detail.component", "./cakes/cake.service", "./add-cake-form.component", "angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, top_nav_component_1, cake_detail_component_1, cake_service_1, add_cake_form_component_1, core_2;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (top_nav_component_1_1) {
                top_nav_component_1 = top_nav_component_1_1;
            },
            function (cake_detail_component_1_1) {
                cake_detail_component_1 = cake_detail_component_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            },
            function (add_cake_form_component_1_1) {
                add_cake_form_component_1 = add_cake_form_component_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_cakeService) {
                    this._cakeService = _cakeService;
                }
                AppComponent.prototype.getCakes = function () {
                    var _this = this;
                    this._cakeService.getCakes().then(function (cakes) { return _this.cakes = cakes; });
                };
                AppComponent.prototype.onSelect = function (cake) {
                    this.currentCake = cake;
                };
                AppComponent.prototype.ngOnInit = function () {
                    this.getCakes();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n\t\t<top-nav></top-nav>\n\n\t\t<h2>Caker Profile</h2>\n\t\t<h3>My Cakes</h3>\n\t\t<ul>\n\t\t    <li>\n                <add-cake-form></add-cake-form>\n            </li>\n\t\t\t<li *ngFor=\"#cake of cakes\"\n\t            (click)=\"onSelect(cake)\">\n\t\t\t\t<a>{{cake.name}}</a>\n\t\t\t</li>\n\t\t</ul>\n\t\t<hr>\n\t\t<cake-detail [cake]=\"currentCake\"></cake-detail>\n\t\t",
                        styleUrls: ["app/main.css"],
                        encapsulation: core_2.ViewEncapsulation.None,
                        directives: [top_nav_component_1.TopNavComponent, add_cake_form_component_1.AddCakeFormComponent, cake_detail_component_1.CakeDetailComponent],
                        providers: [cake_service_1.CakeService]
                    }), 
                    __metadata('design:paramtypes', [cake_service_1.CakeService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map