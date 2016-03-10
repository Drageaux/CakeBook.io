import {Component, Input} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {OnInit} from "angular2/core";

import {Cake} from "./cake";
import {CakeService} from "./cake.service";

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

    addIngredient() {
        if (!this.isEmptyString(this.currIngr)) {
            console.log(this.currIngr);
        }
    }

    addStep() {
        if (!this.isEmptyString(this.currStep)) {
            console.log(this.currStep);
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