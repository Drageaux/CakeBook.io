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
        if (detailType == "ingr") {
            if (!this.isEmptyString(this.currIngr)) {
                this._service.addCakeDetail(this.cake._id, "ingr", this.currIngr)
                    .subscribe(cake => this.cake = cake);
                this.currIngr = "";
            }
        }
        else if (detailType == "step") {
            if (!this.isEmptyString(this.currStep)) {
                this._service.addCakeDetail(this.cake._id, "step", this.currStep)
                    .subscribe(cake => this.cake = cake);
                this.currStep = "";
            }
        }
    }

    readImageFile(event:any, callback:Function) {
        this.cake.croppedImage = "http://res.cloudinary.com/hns6msnxn/image/upload/v1458335198/vt0zkfxtwhajsikca7hc.gif";
        let FR = new FileReader();
        FR.onload = function (e:any) {
            callback(e.target.result);
        };
        FR.readAsDataURL(event.target.files[0]);
    }

    uploadImage(input:string) {
        let fileType = input.match("data:image/(.*);base64")[1];
        let parsedInput = input.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");
        this._service.uploadCakeImage(this.cake._id, parsedInput, fileType)
            .subscribe(
                cake => this.cake = cake
            );
    }

    deleteCake() {
        this._service.deleteCake(this.cake._id)
            .subscribe(
                res => this._router.navigate(["Home"]));
    }

    isEmptyString(str:string) {
        return str == "" || str == null;
    }

    gotoCakes() {
        this._router.navigate(["Home"]);
    }
}