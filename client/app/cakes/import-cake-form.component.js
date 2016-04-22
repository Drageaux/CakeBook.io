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
                    this.previewed = new core_1.EventEmitter();
                    this.active = false;
                    this.modelString = "";
                    this.header = "Paste a Recipe Here";
                    this.model = new cake_1.Cake(0, false, this.userId, "", "", "", "", [], []);
                    this.tooltipTitle = "\n        <p style='text-align:left; padding: 5px; margin-bottom: 0'>\n            <b>How To</b>:<br>\n            - Name is required\n            - <b>Type 'none' or 'None' to <i>leave blank</i></b><br>\n            <br>\n            <b>Template</b>:\n        </p>\n<pre style='margin-top: 0; text-align: left'>*name*\n\n*description*\n\n*ingredient #1*\n*ingredient #2*\n*ingredient #3*\n\n*step #1*\n*step #2*</pre>\n        ";
                }
                ImportCakeFormComponent.prototype.openForm = function () {
                    this.active = true;
                };
                ImportCakeFormComponent.prototype.closeForm = function () {
                    this.active = false;
                };
                ImportCakeFormComponent.prototype.togglePublicity = function () {
                    if (this.model.isPublic != null) {
                        this.model.isPublic = !this.model.isPublic;
                        document.getElementById("publicToggleImport").checked
                            = this.model.isPublic;
                    }
                    else {
                        this.model.isPublic = true;
                        document.getElementById("publicToggleImport").checked
                            = true;
                    }
                };
                ImportCakeFormComponent.prototype.onPreview = function () {
                    this.previewed.emit(this.model);
                };
                ImportCakeFormComponent.prototype.parsePreview = function () {
                    // split into list of elements
                    var cursor;
                    var isIngr = true;
                    var indexIngr = 0;
                    var isStep = false;
                    var indexStep = 0;
                    var modelArray = this.modelString.split("\n");
                    if (modelArray[0]) {
                        this.model.name = modelArray[0];
                    }
                    if (modelArray[2].toLowerCase() != "none") {
                        this.model.description = modelArray[2];
                    }
                    cursor = 4;
                    while (isIngr) {
                        if (modelArray[cursor] && modelArray[cursor].toLowerCase() != "none") {
                            this.model.ingredients[indexIngr] = {
                                "index": indexIngr,
                                "value": modelArray[cursor]
                            };
                        }
                        else if (modelArray[cursor] && modelArray[cursor].toLowerCase() == "none") {
                            this.model.ingredients = [];
                        }
                        else {
                            isIngr = false;
                            break;
                        }
                        indexIngr++;
                        cursor++;
                    }
                    cursor++;
                    isStep = true;
                    while (isStep) {
                        if (modelArray[cursor] && modelArray[cursor].toLowerCase() != "none") {
                            this.model.steps[indexStep] = {
                                "index": indexStep,
                                "value": modelArray[cursor]
                            };
                        }
                        else if (modelArray[cursor] && modelArray[cursor].toLowerCase() == "none") {
                            this.model.steps = [];
                        }
                        else {
                            isStep = false;
                            break;
                        }
                        indexStep++;
                        cursor++;
                    }
                    this.onPreview();
                };
                ImportCakeFormComponent.prototype.importCake = function () {
                    var _this = this;
                    if (this.isEmptyString(this.modelString) || this.isEmptyString(this.model.name)) {
                        return;
                    }
                    this.parsePreview();
                    this._cakeService.addCake(JSON.stringify(this.model))
                        .subscribe(function (res) { return _this.saved.emit(res); });
                    // TODO: Remove when there's a better way to reset the model
                    this.model = new cake_1.Cake(0, false, this.userId, "", "", "", "", [], []);
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
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ImportCakeFormComponent.prototype, "previewed", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ImportCakeFormComponent.prototype, "active", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ImportCakeFormComponent.prototype, "isModal", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ImportCakeFormComponent.prototype, "modelString", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ImportCakeFormComponent.prototype, "header", void 0);
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