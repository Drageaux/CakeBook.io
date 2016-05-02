import {Component, Input, OnInit} from "angular2/core";
import {Router, RouteParams, CanActivate} from "angular2/router";
import {Observable} from "rxjs/Observable";

import {Cake} from "./cake";
import {CakeService} from "./cake.service";
import {EditableItemForm} from "./editable-item-form.component";

declare var jQuery;

@Component({
    selector: "cake-details",
    templateUrl: "templates/cake-details.component.html",
    directives: [EditableItemForm]
})

export class CakeDetailsComponent implements OnInit {
    cake:Cake;
    tempIngrs:Object[] = [];
    tempSteps:Object[] = [];
    currName = {"value": "", "editing": false};
    currDesc = {"value": "", "editing": false};
    public uploadCallBack:Function;

    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _service:CakeService) {
    }

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._service.getCake(id)
            .subscribe(
                cake => {
                    this.cake = cake;
                    for (let i in this.cake.ingredients) {
                        this.tempIngrs.push(this.cake.ingredients[i]);
                    }
                    for (let i in this.cake.steps) {
                        this.tempSteps.push(this.cake.steps[i]);
                    }
                },
                error => this._router.navigate(["Home"])
            );
        this.uploadCallBack = this.uploadImage.bind(this);
    }

    addDetail(detailType:string, value:string) {
        if (detailType == "desc") {
            this._service.addCakeDetail(this.cake._id, detailType, this.currDesc["value"]);
        } else {
            if (!this.isEmptyString(value)) {
                if (detailType == "ingr") {
                    this.tempIngrs.push({"index": this.tempIngrs.length, "value": value});
                }
                else if (detailType == "step") {
                    this.tempSteps.push({"index": this.tempSteps.length, "value": value});
                }
            }
        }
    }

    removeDetail(detailType:string, index:number) {
        if (detailType == "ingr") {
            this.tempIngrs.splice(index, 1);
            for (let i in this.tempIngrs) {
                this.tempIngrs[i][index] = i;
            }
        }
        else if (detailType == "step") {
            this.tempSteps.splice(index, 1);
            for (let i in this.tempSteps) {
                this.tempSteps[i][index] = i;
            }
        }
    }

    editDetail(detailType:string) {
        if (detailType == "name") {
            this.currName["editing"] = true;
            window.setTimeout(function () {
                jQuery("#newName").focus();
                jQuery("#newName").select();
            }, 100);
        } else if (detailType == "desc") {
            this.currDesc["editing"] = true;
        } else if (detailType == "isPublic") {
            this._service.updateCakeDetail(this.cake._id, detailType, 0, "")
                .subscribe(cake => {
                    this.cake = cake;
                    if (cake.isPublic != null) {
                        (<HTMLInputElement> document.getElementById("publicToggle")).checked
                            = cake.isPublic;
                    } else {
                        (<HTMLInputElement> document.getElementById("publicToggle")).checked
                            = false;
                    }
                });
        } else if (detailType == "isFavorite") {
            this._service.updateCakeDetail(this.cake._id, detailType, 0, "")
                .subscribe(cake => this.cake = cake);
        }
    }

    saveEdit(detailType:string, obj:any) {
        if (detailType == "name") {
            obj.value = obj.value.replace(/\s+$/, "");
            if (obj.value.length > 4) {
                this.currName["editing"] = false;
                this._service.updateCakeDetail(this.cake._id, "name", 0, obj.value)
                    .subscribe(cake => this.cake = cake);
            }
        } else if (detailType == "desc") {
            obj.value = obj.value.replace(/\s+$/, "");
            this.currDesc["editing"] = false;
            this._service.updateCakeDetail(this.cake._id, "desc", 0, obj.value)
                .subscribe(cake => this.cake = cake);
        } else {
            if (!this.isEmptyString(obj)) {
                if (detailType == "ingr") {
                    this.tempIngrs[obj.index] = obj;
                } else if (detailType == "step") {
                    this.tempSteps[obj.index] = obj;
                }
            }
        }
    }

    cancelEdit(detailType:string, index:number) {
        if (detailType == "desc") {
            this.currDesc["editing"] = false;
        }
    }

    submitEdit(detailType:string) {
        if (detailType == "ingr") {
            this._service.updateCakeDetail(this.cake._id, detailType, 0, JSON.stringify(this.tempIngrs))
                .subscribe(cake => this.cake = cake);
        } else if (detailType == "step") {
            this._service.updateCakeDetail(this.cake._id, detailType, 0, JSON.stringify(this.tempSteps))
                .subscribe(cake => this.cake = cake);
        }
    }

    uploadImage(input:string, oldImage:string) {
        let fileType;
        // check if is an image
        let inputMatchArray = input.match("data:image/(.*);base64");
        if (inputMatchArray) {
            // get and filter for correct file type
            fileType = inputMatchArray[1];
            if (fileType.match(/(png|jpg|jpeg)/)) {
                let parsedInput = input.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                this._service.uploadCakeImage(this.cake._id, parsedInput, fileType)
                    .subscribe(
                        cake => this.cake = cake,
                        err => this.cake.croppedImage = oldImage
                    );
            }
            else {
                this.openModal();
                console.log("Bad Image Extension");
                this.cake.croppedImage = oldImage;
            }
        } else {
            this.openModal();
            console.log("Not An Image");
            this.cake.croppedImage = oldImage;
        }
    }

    deleteCake() {
        this._service.deleteCake(this.cake._id)
            .subscribe(
                res => this._router.navigate(["Home"]));
    }


    /********************
     * Helper Functions *
     ********************/
    isEditing(itemType:string) {
        if (itemType == "name") {
            return this.currName["editing"];
        } else if (itemType == "desc") {
            return this.currDesc["editing"]
        }
    }

    isEmptyString(str:string) {
        return str == "" || str == null;
    }

    isOwner() {
        return (this.cake.user == JSON.parse(localStorage.getItem("profile")).user_id)
    }

    readImage(event:any, callback:Function) {
        if (event.target.files[0]) {
            let oldImage = this.cake.croppedImage;
            this.cake.croppedImage = "http://res.cloudinary.com/hns6msnxn/image/upload/v1458335198/vt0zkfxtwhajsikca7hc.gif";
            let FR = new FileReader();
            FR.onload = function (e:any) {
                callback(e.target.result, oldImage);
            };
            FR.readAsDataURL(event.target.files[0]);
        }
    }

    openModal() {
        document.getElementById("modal-button").click();
    }

    goHome() {
        this._router.navigate(["Home"]);
    }
}