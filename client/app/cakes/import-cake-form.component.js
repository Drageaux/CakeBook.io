System.register(["angular2/core", "./cake", "./cake.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, cake_1, cake_service_1;
    var ImportCakeFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cake_1_1) {
                cake_1 = cake_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            }],
        execute: function() {
            ImportCakeFormComponent = (function () {
                function ImportCakeFormComponent(_cakeService) {
                    this._cakeService = _cakeService;
                    this.userId = JSON.parse(localStorage.getItem("profile")).user_id; // must be defined first
                    this.saved = new core_1.EventEmitter();
                    this.modelString = "";
                    this.model = new cake_1.Cake(0, this.userId, "", "", "", "", [], []);
                    this.active = false;
                }
                ImportCakeFormComponent.prototype.openForm = function () {
                    this.active = true;
                };
                ImportCakeFormComponent.prototype.closeForm = function () {
                    this.active = false;
                };
                ImportCakeFormComponent.prototype.importCake = function (value) {
                    if (this.isEmptyString(this.modelString)) {
                        return;
                    }
                    console.log(this.modelString);
                    //this._cakeService.addCake(JSON.stringify(this.model))
                    //    .subscribe(res => this.saved.emit(res));
                    // TODO: Remove when there's a better way to reset the model
                    //this.model = new Cake(0, this.userId, "", "", "", "", [], []);
                    this.closeForm();
                };
                /********************
                 * Helper Functions *
                 ********************/
                ImportCakeFormComponent.prototype.isEmptyString = function (str) {
                    return str == "" || str == null;
                };
                Object.defineProperty(ImportCakeFormComponent.prototype, "diagnostic", {
                    // TODO: Remove this when we're done
                    get: function () {
                        return JSON.stringify(this.model);
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    // must be defined first
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ImportCakeFormComponent.prototype, "saved", void 0);
                ImportCakeFormComponent = __decorate([
                    core_1.Component({
                        selector: "import-cake-form",
                        templateUrl: "templates/import-cake-form.component.html",
                    }), 
                    __metadata('design:paramtypes', [cake_service_1.CakeService])
                ], ImportCakeFormComponent);
                return ImportCakeFormComponent;
            })();
            exports_1("ImportCakeFormComponent", ImportCakeFormComponent);
        }
    }
});
//# sourceMappingURL=import-cake-form.component.js.map