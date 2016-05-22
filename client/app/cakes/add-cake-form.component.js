var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var cake_1 = require("./cake");
var editable_item_form_component_1 = require("./editable-item-form.component");
var cake_service_1 = require("./cake.service");
var AddCakeFormComponent = (function () {
    function AddCakeFormComponent(_cakeService) {
        this._cakeService = _cakeService;
        this.userId = JSON.parse(localStorage.getItem("profile")).user_id; // must be defined first
        this.saved = new core_1.EventEmitter();
        this.model = new cake_1.Cake("", false, false, this.userId, "", "", "", "", [], []);
    }
    AddCakeFormComponent.prototype.ngOnInit = function () {
        jQuery("#addCakeForm").form({
            fields: {
                name: {
                    identifier: "cakeName",
                    rules: [
                        {
                            type: "minLength[5]",
                            prompt: "Cake name must have at least 5 characters"
                        }
                    ]
                }
            }
        });
    };
    AddCakeFormComponent.prototype.clearForm = function () {
        this.model = new cake_1.Cake("", false, false, this.userId, "", "", "", "", [], []);
        jQuery("#cakeName").blur();
        jQuery("#addCakeForm").form('reset');
        jQuery("#addErrorMessage").empty();
    };
    AddCakeFormComponent.prototype.addCake = function () {
        var _this = this;
        if (this.model.name.length < 5) {
            return;
        }
        this._cakeService.addCake(JSON.stringify(this.model))
            .subscribe(function (res) {
            _this.saved.emit(res);
            _this.clearForm();
        });
        // TODO: Remove when there's a better way to reset the model
    };
    AddCakeFormComponent.prototype.togglePublicity = function () {
        if (this.model.isPublic != null) {
            this.model.isPublic = !this.model.isPublic;
            document.getElementById("publicToggleAdd").checked
                = this.model.isPublic;
        }
        else {
            this.model.isPublic = true;
            document.getElementById("publicToggleAdd").checked
                = true;
        }
    };
    AddCakeFormComponent.prototype.updateDescription = function (input) {
        this.model.description = input;
    };
    /* Ingredients and Steps */
    AddCakeFormComponent.prototype.addOptionalItem = function (itemType, value) {
        if (itemType == "ingr") {
            // prevent spamming ingredients
            if (value != "") {
                this.model.ingredients.push({
                    "index": this.model.ingredients.length,
                    "value": value
                });
            }
        }
        else if (itemType == "step") {
            // prevent spamming steps
            if (value != "") {
                this.model.steps.push({
                    "index": this.model.steps.length,
                    "value": value
                });
            }
        }
    };
    AddCakeFormComponent.prototype.removeOptionalItem = function (itemType, index) {
        if (itemType == "ingr") {
            if (this.model.ingredients.length <= 0) {
                return;
            }
            this.model.ingredients.splice(index, 1);
            for (var i = 0; i < this.model.ingredients.length; i++) {
                this.model.ingredients[i]["index"] = i;
            }
        }
        else if (itemType == "step") {
            if (this.model.steps.length <= 0) {
                return;
            }
            this.model.steps.splice(index, 1);
            for (var i = 0; i < this.model.steps.length; i++) {
                this.model.steps[i]["index"] = i;
            }
        }
    };
    AddCakeFormComponent.prototype.saveEdit = function (itemType, obj) {
        if (itemType == "ingr") {
            this.model.ingredients[obj.index]["value"] = obj.value;
        }
        else if (itemType == "step") {
            this.model.steps[obj.index]["value"] = obj.value;
        }
    };
    /********************
     * Helper Functions *
     ********************/
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
        // must be defined first
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddCakeFormComponent.prototype, "saved", void 0);
    AddCakeFormComponent = __decorate([
        core_1.Component({
            selector: "add-cake-form",
            templateUrl: "templates/add-cake-form.component.html",
            directives: [editable_item_form_component_1.EditableItemForm]
        }), 
        __metadata('design:paramtypes', [cake_service_1.CakeService])
    ], AddCakeFormComponent);
    return AddCakeFormComponent;
})();
exports.AddCakeFormComponent = AddCakeFormComponent;
//# sourceMappingURL=add-cake-form.component.js.map