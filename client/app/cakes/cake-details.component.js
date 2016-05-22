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
var router_1 = require("@angular/router");
var router_deprecated_1 = require('@angular/router-deprecated');
var cake_service_1 = require("./cake.service");
var editable_item_form_component_1 = require("./editable-item-form.component");
var CakeDetailsComponent = (function () {
    function CakeDetailsComponent(_router, _routeParams, _service) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._service = _service;
        this.tempIngrs = [];
        this.tempSteps = [];
        this.currName = { "value": "", "editing": false };
        this.currDesc = { "value": "", "editing": false };
    }
    CakeDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._service.getCake(id)
            .subscribe(function (cake) {
            _this.cake = cake;
            for (var i in _this.cake.ingredients) {
                _this.tempIngrs.push(_this.cake.ingredients[i]);
            }
            for (var i in _this.cake.steps) {
                _this.tempSteps.push(_this.cake.steps[i]);
            }
        }, function (error) { return _this._router.navigate(["Home"]); });
        this.uploadCallBack = this.uploadImage.bind(this);
    };
    CakeDetailsComponent.prototype.viewImage = function (cake) {
        jQuery(".ui.dimmer").dimmer('show');
    };
    CakeDetailsComponent.prototype.closeImage = function () {
        jQuery(".ui.dimmer").dimmer("hide");
    };
    CakeDetailsComponent.prototype.addDetail = function (detailType, value) {
        if (detailType == "desc") {
            this._service.addCakeDetail(this.cake._id, detailType, this.currDesc["value"]);
        }
        else {
            if (!this.isEmptyString(value)) {
                if (detailType == "ingr") {
                    this.tempIngrs.push({ "index": this.tempIngrs.length, "value": value });
                }
                else if (detailType == "step") {
                    this.tempSteps.push({ "index": this.tempSteps.length, "value": value });
                }
            }
        }
    };
    CakeDetailsComponent.prototype.removeDetail = function (detailType, index) {
        if (detailType == "ingr") {
            this.tempIngrs.splice(index, 1);
            for (var i in this.tempIngrs) {
                this.tempIngrs[i][index] = i;
            }
        }
        else if (detailType == "step") {
            this.tempSteps.splice(index, 1);
            for (var i in this.tempSteps) {
                this.tempSteps[i][index] = i;
            }
        }
    };
    CakeDetailsComponent.prototype.editDetail = function (detailType) {
        var _this = this;
        if (detailType == "name") {
            this.currName["editing"] = true;
            window.setTimeout(function () {
                jQuery("#newName").focus();
                jQuery("#newName").select();
            }, 100);
        }
        else if (detailType == "desc") {
            this.currDesc["editing"] = true;
        }
        else if (detailType == "isPublic") {
            this._service.updateCakeDetail(this.cake._id, detailType, 0, "")
                .subscribe(function (cake) {
                _this.cake = cake;
                if (cake.isPublic != null) {
                    document.getElementById("publicToggle").checked
                        = cake.isPublic;
                }
                else {
                    document.getElementById("publicToggle").checked
                        = false;
                }
            });
        }
        else if (detailType == "isFavorite") {
            this._service.updateCakeDetail(this.cake._id, detailType, 0, "")
                .subscribe(function (cake) { return _this.cake = cake; });
        }
    };
    CakeDetailsComponent.prototype.saveEdit = function (detailType, obj) {
        var _this = this;
        if (detailType == "name") {
            obj.value = obj.value.replace(/\s+$/, "");
            if (obj.value.length > 4) {
                this.currName["editing"] = false;
                this._service.updateCakeDetail(this.cake._id, "name", 0, obj.value)
                    .subscribe(function (cake) { return _this.cake = cake; });
            }
        }
        else if (detailType == "desc") {
            obj.value = obj.value.replace(/\s+$/, "");
            this.currDesc["editing"] = false;
            this._service.updateCakeDetail(this.cake._id, "desc", 0, obj.value)
                .subscribe(function (cake) { return _this.cake = cake; });
        }
        else {
            if (!this.isEmptyString(obj)) {
                if (detailType == "ingr") {
                    this.tempIngrs[obj.index] = obj;
                }
                else if (detailType == "step") {
                    this.tempSteps[obj.index] = obj;
                }
            }
        }
    };
    CakeDetailsComponent.prototype.cancelEdit = function (detailType, index) {
        if (detailType == "desc") {
            this.currDesc["editing"] = false;
        }
    };
    CakeDetailsComponent.prototype.submitEdit = function (detailType) {
        var _this = this;
        if (detailType == "ingr") {
            this._service.updateCakeDetail(this.cake._id, detailType, 0, JSON.stringify(this.tempIngrs))
                .subscribe(function (cake) { return _this.cake = cake; });
        }
        else if (detailType == "step") {
            this._service.updateCakeDetail(this.cake._id, detailType, 0, JSON.stringify(this.tempSteps))
                .subscribe(function (cake) { return _this.cake = cake; });
        }
    };
    CakeDetailsComponent.prototype.uploadImage = function (input, oldImage) {
        var _this = this;
        var fileType;
        // check if is an image
        var inputMatchArray = input.match("data:image/(.*);base64");
        if (inputMatchArray) {
            // get and filter for correct file type
            fileType = inputMatchArray[1];
            if (fileType.match(/(png|jpg|jpeg)/)) {
                var parsedInput = input.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                this._service.uploadCakeImage(this.cake._id, parsedInput, fileType)
                    .subscribe(function (cake) { return _this.cake = cake; }, function (err) { return _this.cake.croppedImage = oldImage; });
            }
            else {
                this.openModal();
                console.log("Bad Image Extension");
                this.cake.croppedImage = oldImage;
            }
        }
        else {
            this.openModal();
            console.log("Not An Image");
            this.cake.croppedImage = oldImage;
        }
    };
    CakeDetailsComponent.prototype.deleteCake = function () {
        var _this = this;
        this._service.deleteCake(this.cake._id)
            .subscribe(function (res) { return _this._router.navigate(["Home"]); });
    };
    /********************
     * Helper Functions *
     ********************/
    CakeDetailsComponent.prototype.isEditing = function (itemType) {
        if (itemType == "name") {
            return this.currName["editing"];
        }
        else if (itemType == "desc") {
            return this.currDesc["editing"];
        }
    };
    CakeDetailsComponent.prototype.isEmptyString = function (str) {
        return str == "" || str == null;
    };
    CakeDetailsComponent.prototype.isOwner = function () {
        return (this.cake.user == JSON.parse(localStorage.getItem("profile")).user_id);
    };
    CakeDetailsComponent.prototype.readImage = function (event, callback) {
        if (event.target.files[0]) {
            var oldImage = this.cake.croppedImage;
            this.cake.croppedImage = "http://res.cloudinary.com/hns6msnxn/image/upload/v1458335198/vt0zkfxtwhajsikca7hc.gif";
            var FR = new FileReader();
            FR.onload = function (e) {
                callback(e.target.result, oldImage);
            };
            FR.readAsDataURL(event.target.files[0]);
        }
    };
    CakeDetailsComponent.prototype.openModal = function () {
        document.getElementById("modal-button").click();
    };
    CakeDetailsComponent.prototype.goHome = function () {
        this._router.navigate(["Home"]);
    };
    CakeDetailsComponent = __decorate([
        core_1.Component({
            selector: "cake-details",
            templateUrl: "templates/cake-details.component.html",
            directives: [editable_item_form_component_1.EditableItemForm]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_deprecated_1.RouteParams, cake_service_1.CakeService])
    ], CakeDetailsComponent);
    return CakeDetailsComponent;
})();
exports.CakeDetailsComponent = CakeDetailsComponent;
//# sourceMappingURL=cake-details.component.js.map