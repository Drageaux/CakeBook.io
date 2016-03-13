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
    var core_1, cake_1, cake_service_1, core_2;
    var AddCakeFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (cake_1_1) {
                cake_1 = cake_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            }],
        execute: function() {
            AddCakeFormComponent = (function () {
                function AddCakeFormComponent(_cakeService) {
                    this._cakeService = _cakeService;
                    this.saved = new core_1.EventEmitter();
                    this.ingrList = [];
                    this.currIngr = { "value": "", "editing": false };
                    this.stepList = [];
                    this.currStep = { "value": "", "editing": false };
                    this.model = new cake_1.Cake(0, "", "", [], []);
                    this.active = false;
                }
                AddCakeFormComponent.prototype.openForm = function () {
                    this.active = true;
                };
                AddCakeFormComponent.prototype.closeForm = function () {
                    this.active = false;
                };
                AddCakeFormComponent.prototype.addCake = function (name) {
                    var _this = this;
                    if (!name) {
                        return;
                    }
                    // parse lists of ingredients and steps and insert to the model
                    for (var i = 0; i < this.ingrList.length; i++) {
                        var currIngr = this.ingrList[i]["value"];
                        if (currIngr != "") {
                            this.model.ingredients.push(currIngr);
                        }
                    }
                    for (var i = 0; i < this.stepList.length; i++) {
                        var currStep = this.stepList[i]["value"];
                        if (currStep != "") {
                            this.model.steps.push(currStep);
                        }
                    }
                    this._cakeService.addCake(JSON.stringify(this.model))
                        .subscribe(function (res) { return _this.saved.emit(res); });
                    // TODO: Remove when there's a better way to reset the model
                    this.model = new cake_1.Cake(0, "", "", [""], [""]);
                    this.closeForm();
                };
                /* Ingredients and Steps */
                AddCakeFormComponent.prototype.addOptionalItem = function (itemType) {
                    if (itemType == "ingr") {
                        // prevent spamming creation
                        if (this.currIngr.value != "") {
                            this.ingrList.push(this.currIngr);
                            this.currIngr = { "value": "", "editing": false };
                        }
                    }
                    else if (itemType == "step") {
                        // prevent spamming creation
                        if (this.currStep.value != "") {
                            this.stepList.push(this.currStep);
                            this.currStep = { "value": "", "editing": false };
                        }
                    }
                };
                AddCakeFormComponent.prototype.removeOptionalItem = function (itemType, index) {
                    if (itemType == "ingr") {
                        if (this.ingrList.length <= 0) {
                            return;
                        }
                        return this.ingrList.splice(index, 1);
                    }
                    else if (itemType == "step") {
                        if (this.stepList.length <= 0) {
                            return;
                        }
                        return this.stepList.splice(index, 1);
                    }
                };
                AddCakeFormComponent.prototype.editOptionalItem = function (itemType, index) {
                    if (itemType == "ingr") {
                        this.ingrList[index]["editing"] = true;
                    }
                    else if (itemType == "step") {
                        this.stepList[index]["editing"] = true;
                    }
                };
                /* Editing Ingredients and Steps */
                AddCakeFormComponent.prototype.saveEdit = function (itemType, index, value) {
                    if (itemType == "ingr") {
                        this.ingrList[index]["value"] = value;
                        this.ingrList[index]["editing"] = false;
                    }
                    else if (itemType == "step") {
                        this.stepList[index]["value"] = value;
                        this.stepList[index]["editing"] = false;
                    }
                };
                AddCakeFormComponent.prototype.cancelEdit = function (itemType, index) {
                    if (itemType == "ingr") {
                        this.ingrList[index]["editing"] = false;
                    }
                    else if (itemType == "step") {
                        this.stepList[index]["editing"] = false;
                    }
                };
                /* Checks */
                AddCakeFormComponent.prototype.isEditing = function (itemType, index) {
                    if (itemType == "ingr") {
                        return this.ingrList[index]["editing"];
                    }
                    else if (itemType == "step") {
                        return this.stepList[index]["editing"];
                    }
                };
                AddCakeFormComponent.prototype.isEmptyString = function (str) {
                    return str == "" || str == null;
                };
                Object.defineProperty(AddCakeFormComponent.prototype, "diagnostic", {
                    // TODO: Remove this when we're done
                    get: function () {
                        return JSON.stringify(this.model);
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', Object)
                ], AddCakeFormComponent.prototype, "saved", void 0);
                AddCakeFormComponent = __decorate([
                    core_1.Component({
                        selector: "add-cake-form",
                        templateUrl: "templates/add-cake-form.component.html"
                    }), 
                    __metadata('design:paramtypes', [cake_service_1.CakeService])
                ], AddCakeFormComponent);
                return AddCakeFormComponent;
            })();
            exports_1("AddCakeFormComponent", AddCakeFormComponent);
        }
    }
});
//# sourceMappingURL=add-cake-form.component.js.map