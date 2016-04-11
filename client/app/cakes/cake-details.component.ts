import {Component, Input, OnInit} from "angular2/core";
import {Router, RouteParams, CanActivate} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";
import {Observable} from "rxjs/Observable";

import {Cake} from "./cake";
import {CakeService} from "./cake.service";
import {EditableItemForm} from "./editable-item-form.component";

@Component({
    selector: "cake-details",
    templateUrl: "templates/cake-details.component.html",
    directives: [EditableItemForm]
})

@CanActivate(() => tokenNotExpired())
export class CakeDetailsComponent implements OnInit {
    cake:Cake;
    tempIngrs:Object[] = [];
    tempSteps:Object[] = [];
    currDesc = {"value": "", "editing": false};
    public uploadCallBack:Function;
    formIngr = false;
    formStep = false;

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
                //this._service.addCakeDetail(this.cake._id, detailType, value)
                //    .subscribe(cake => this.cake = cake);
                if (detailType == "ingr") {
                    this.tempIngrs.push({"index": this.tempIngrs.length, "value": value});
                }
                else if (detailType == "step") {
                }
            }
        }
    }

    removeDetail(detailType:string, index:number) {
        this._service.removeCakeDetail(this.cake._id, detailType, index)
            .subscribe(cake => this.cake = cake);
    }

    editDetail(detailType:string, index:number) {
        if (detailType == "desc") {
            this.currDesc["editing"] = true;
        }
    }

    saveEdit(detailType:string, obj:any) {
        if (detailType == "desc") {
            this.currDesc["editing"] = false;
            this._service.addCakeDetail(this.cake._id, "desc", obj.value.replace(/\s+$/, ""))
                .subscribe(cake => this.cake = cake);
        } else if (detailType == "ingr" || detailType == "step") {
            this._service.updateCakeDetail(this.cake._id, detailType, obj.index, obj.value)
                .subscribe(cake => this.cake = cake);
        }
    }

    cancelEdit(detailType:string, index:number) {
        if (detailType == "desc") {
            this.currDesc["editing"] = false;
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
                        err => this.cake.croppedImage = oldImage,
                        () => console.log(this.cake)
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
        if (itemType == "desc") {
            return this.currDesc["editing"]
        }
    }

    openForm(itemType:string) {
        if (itemType == "ingr") {
            this.formIngr = true;
        }
        else if (itemType == "step") {
            this.formStep = true;
        }
    }

    closeForm(itemType:string) {
        if (itemType == "ingr") {
            this.formIngr == false;
        }
        else if (itemType == "step") {
            this.formStep == false;
        }
    }

    isEmptyString(str:string) {
        return str == "" || str == null;
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

    gotoCakes() {
        this._router.navigate(["Home"]);
    }
}