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
var ng2_dragula_1 = require("ng2-dragula/ng2-dragula");
var EditableItemForm = (function () {
    function EditableItemForm(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.editing = [];
        this.onAdded = new core_1.EventEmitter();
        this.onRemoved = new core_1.EventEmitter();
        this.onSaved = new core_1.EventEmitter();
        dragulaService.setOptions('dragula-bag', {
            moves: function (el, container, handle) {
                return handle.className == 'handle';
            }
        });
        dragulaService.drag.subscribe(function (value) {
            _this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe(function (value) {
            _this.onDrop(value.slice(1));
        });
    }
    EditableItemForm.prototype.onDrag = function (args) {
        for (var i in this.itemList) {
            this.editing[i] = false;
        }
    };
    EditableItemForm.prototype.onDrop = function (args) {
        for (var i in this.itemList) {
            this.itemList[i]["index"] = i;
        }
    };
    EditableItemForm.prototype.ngOnInit = function () {
        for (var i in this.itemList) {
            this.editing.push(false);
        }
    };
    EditableItemForm.prototype.addItem = function (value, form) {
        if (this.isValidInput(value)) {
            this.onAdded.emit(value);
            this.currItem = "";
            this.editing.push(false);
        }
        // auto scrolls down to the bottom of the list
        var ul = form.getElementsByTagName("ul")[0];
        if (ul) {
            ul.scrollTop = ul.scrollHeight;
        }
    };
    EditableItemForm.prototype.removeItem = function (index) {
        this.onRemoved.emit(index);
        this.editing.splice(index, 1);
    };
    /* Editing Ingredients and Steps */
    EditableItemForm.prototype.editItem = function (index) {
        this.editing[index] = true;
    };
    EditableItemForm.prototype.saveEdit = function (index, value) {
        this.onSaved.emit({ "index": index, "value": value });
        this.cancelEdit(index);
    };
    EditableItemForm.prototype.cancelEdit = function (index) {
        this.editing[index] = false;
    };
    /* Helper Functions */
    EditableItemForm.prototype.isEditing = function (index) {
        return this.editing[index];
    };
    EditableItemForm.prototype.isEmptyString = function (str) {
        return str == "" || str == null;
    };
    EditableItemForm.prototype.isValidInput = function (str) {
        if (!this.isEmptyString(str)) {
            return str.length > 2;
        }
        return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EditableItemForm.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EditableItemForm.prototype, "itemList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EditableItemForm.prototype, "onAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EditableItemForm.prototype, "onRemoved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EditableItemForm.prototype, "onSaved", void 0);
    EditableItemForm = __decorate([
        core_1.Component({
            selector: "editable-item-list",
            templateUrl: "templates/editable-item-form.component.html",
            directives: [ng2_dragula_1.Dragula],
            providers: [ng2_dragula_1.DragulaService]
        }), 
        __metadata('design:paramtypes', [ng2_dragula_1.DragulaService])
    ], EditableItemForm);
    return EditableItemForm;
})();
exports.EditableItemForm = EditableItemForm;
//# sourceMappingURL=editable-item-form.component.js.map