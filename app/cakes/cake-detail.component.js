System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var CakeDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CakeDetailComponent = (function () {
                function CakeDetailComponent() {
                }
                CakeDetailComponent = __decorate([
                    core_1.Component({
                        selector: "cake-detail",
                        template: "\n        <div *ngIf=\"cake\">\n\t\t\t<h4>Details: {{cake.name}}</h4>\n\t\t\t<ul><label><b>Ingredients</b></label>\n\t\t\t\t<li *ngFor=\"#ingr of cake.ingredients\">\n\t\t\t\t\t{{ingr}}\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<ol><label><b>Steps</b></label>\n\t\t\t\t<li *ngFor=\"#step of cake.steps\">\n\t\t\t\t\t{{step}}\n\t\t\t\t</li>\n\t\t\t</ol>\n\t\t</div>\n        ",
                        inputs: ["cake"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], CakeDetailComponent);
                return CakeDetailComponent;
            })();
            exports_1("CakeDetailComponent", CakeDetailComponent);
        }
    }
});
//# sourceMappingURL=cake-detail.component.js.map