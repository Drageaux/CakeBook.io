System.register(['angular2/core', "./cake"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, cake_1;
    var AddCakeFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cake_1_1) {
                cake_1 = cake_1_1;
            }],
        execute: function() {
            AddCakeFormComponent = (function () {
                function AddCakeFormComponent() {
                    this.model = new cake_1.Cake(10, "Easy Chocolate Chip Brownie Cheesecake", [
                        "1 box of brownie mix, and ingredients needed to make them",
                        "16 oz cream cheese, softened",
                        "1 cup sugar",
                        "1 tsp vanilla",
                        "8 oz whipped cream or whipped topping",
                        "1 cup chocolate chips"
                    ], [
                        "Prepare the brownie mix according to package instructions, and pour the batter into a springform pan.",
                        "Bake according to package instructions, and cool completely.",
                        "Meanwhile, beat cream cheese and sugar until smooth.",
                        "Fold in vanilla and whipped cream, then fold in the chocolate chips.",
                        "Spread over the cooled brownie in the springform pan."
                    ]);
                    this.submitted = false;
                    this.active = true;
                }
                AddCakeFormComponent.prototype.onSubmit = function () {
                    this.submitted = true;
                };
                AddCakeFormComponent.prototype.addCake = function () {
                    var _this = this;
                    this.model = new cake_1.Cake(10, "", [], []);
                    this.active = false;
                    setTimeout(function () { return _this.active = true; }, 0);
                };
                Object.defineProperty(AddCakeFormComponent.prototype, "diagnostic", {
                    // TODO: Remove this when we're done
                    get: function () { return JSON.stringify(this.model); },
                    enumerable: true,
                    configurable: true
                });
                AddCakeFormComponent = __decorate([
                    core_1.Component({
                        selector: "add-cake-form",
                        templateUrl: "app/add-cake-form.component.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], AddCakeFormComponent);
                return AddCakeFormComponent;
            })();
            exports_1("AddCakeFormComponent", AddCakeFormComponent);
        }
    }
});
//# sourceMappingURL=add-cake-form.component.js.map