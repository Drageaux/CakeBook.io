import {Component, Input, OnInit} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";

import {Cake} from "./cake";
import {CakeService} from "./cake.service";
import {Observable} from "rxjs/Observable";
import {CanActivate} from "angular2/router";

@Component({
    selector: "cake-details",
    templateUrl: "templates/cake-details.component.html"
})

@CanActivate(() => tokenNotExpired())
export class CakeDetailsComponent implements OnInit {
    @Input() cake:Cake;
    currDesc = {"value": "", "editing": false};
    currIngr:string;
    currStep:string;
    @Input() public uploadCallBack:Function;

    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _service:CakeService) {
    }

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._service.getCake(id)
            .subscribe(
                cake => this.cake = cake,
                error => this._router.navigate(["Home"])
            );
        this.uploadCallBack = this.uploadImage.bind(this);
    }

    addDetail(detailType:string) {
        if (detailType == "desc") {
            this._service.addCakeDetail(this.cake._id, detailType, this.currDesc["value"]);
        } else if (detailType == "ingr") {
            if (!this.isEmptyString(this.currIngr)) {
                this._service.addCakeDetail(this.cake._id, detailType, this.currIngr)
                    .subscribe(cake => this.cake = cake);
                this.currIngr = "";
            }
        } else if (detailType == "step") {
            if (!this.isEmptyString(this.currStep)) {
                this._service.addCakeDetail(this.cake._id, detailType, this.currStep)
                    .subscribe(cake => this.cake = cake);
                this.currStep = "";
            }
        }
    }

    editDetail(detailType:string, index:number) {
        if (detailType == "desc") {
            this.currDesc["editing"] = true;
        }
    }

    saveEdit(detailType:string, index:number, value:string) {
        if (detailType == "desc") {
            this.currDesc["editing"] = false;
            this._service.addCakeDetail(this.cake._id, "desc", value)
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
    isEditing(itemType:string, index:number) {
        if (itemType == "desc") {
            return this.currDesc["editing"];
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