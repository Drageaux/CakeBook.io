import {Component, Input} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {OnInit} from "angular2/core";

import {Cake} from "./cake";
import {CakeService} from "./cake.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "cake-detail",
    templateUrl: "templates/cake-detail.component.html"
})

export class CakeDetailComponent implements OnInit {
    @Input() errorMessage:string;
    @Input() cake:Cake;
    currIngr:string;
    currStep:string;

    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _service:CakeService) {
    }

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._service.getCake(id)
            .subscribe(
                cake => this.cake = cake,
                error => this.errorMessage = <any>error);
    }

    addDetail(detailType:string){
        if (detailType == "ingr") {
            if (!this.isEmptyString(this.currIngr)) {
                this._service.addCakeDetail(this.cake._id, "ingr", this.currIngr)
                    .subscribe(cake => this.cake = cake);
                this.currIngr = "";
            }
        }
        else if (detailType == "step"){
            if (!this.isEmptyString(this.currStep)) {
                this._service.addCakeDetail(this.cake._id, "step", this.currStep)
                    .subscribe(cake => this.cake = cake);
                this.currStep = "";
            }
        }

    }

    deleteCake(id:number) {
        this._service.deleteCake(id)
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