System.register(['angular2/core', "./top-nav.component", "./cake", "./add-cake-form.component", "angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, top_nav_component_1, cake_1, add_cake_form_component_1, core_2;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (top_nav_component_1_1) {
                top_nav_component_1 = top_nav_component_1_1;
            },
            function (cake_1_1) {
                cake_1 = cake_1_1;
            },
            function (add_cake_form_component_1_1) {
                add_cake_form_component_1 = add_cake_form_component_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = "Cake Book";
                    this.cakes = [
                        new cake_1.Cake(1, "Slow Cooker Chocolate Lava Cake", [], []),
                        new cake_1.Cake(2, "S’mores Pizza Roll-Up", [], []),
                        new cake_1.Cake(3, "S'mores Dip", [], []),
                        new cake_1.Cake(4, "Easy No-Bake Chocolate-Ricotta Cake", [
                            "combine 2 parts melted semi sweet chocolate with 3 parts ricotta cheese",
                            "layer with chocolate graham crackers until your selected dish is full",
                            "refrigerate at least 8 hours, up to 48"
                        ], [
                            "8 oz semi sweet chocolate",
                            "chocolate graham crackers",
                            "12 oz ricotta cheese",
                        ]),
                        new cake_1.Cake(5, "Chocolate Mousse", [], [])
                    ];
                }
                AppComponent.prototype.onSelect = function (cake) {
                    this.currentCake = cake;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n\t\t<top-nav></top-nav>\n\n\t\t<h1>{{title}}</h1>\n\t\t<h2>Caker Profile</h2>\n\t\t<h3>My Cakes</h3>\n\t\t<ul>\n\t\t    <li>\n                <add-cake-form></add-cake-form>\n            </li>\n\t\t\t<li *ngFor=\"#cake of cakes\"\n\t            (click)=\"onSelect(cake)\">\n\t\t\t\t<a href=\"#\">{{cake.name}}</a>\n\t\t\t</li>\n\t\t</ul>\n\t\t<br>\n\n\t\t<div *ngIf=\"currentCake\">\n\t\t\t<h4>Details: {{currentCake.name}}</h4>\n\t\t\t<ul><label><b>Ingredients</b></label>\n\t\t\t\t<li *ngFor=\"#ingr of currentCake.ingredients\">\n\t\t\t\t\t{{ingr}}\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<ol><label><b>Steps</b></label>\n\t\t\t\t<li *ngFor=\"#step of currentCake.steps\">\n\t\t\t\t\t{{step}}\n\t\t\t\t</li>\n\t\t\t</ol>\n\t\t</div>\n\t\t",
                        styleUrls: ["app/main.css"],
                        encapsulation: core_2.ViewEncapsulation.None,
                        directives: [top_nav_component_1.TopNavComponent, add_cake_form_component_1.AddCakeFormComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map