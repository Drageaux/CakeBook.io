import {Component, OnInit} from "angular2/core";
import {Router, RouteParams, CanActivate} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";
import {Observable} from "rxjs/Observable";

import {Cake} from "./cake";
import {CakeService} from "./cake.service";

@Component({
    template: `
        <a type="button" [routerLink]="['Search']">Search</a>
    `
})

@CanActivate(() => tokenNotExpired())
export class SearchComponent implements OnInit {
    cakes:Cake[];

    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _service:CakeService) {
    }

    ngOnInit() {
        let query = this._routeParams.get('query');
        console.log(query);
    }

    isEmptyString(str:string) {
        return str == "" || str == null;
    }

    gotoCakes() {
        this._router.navigate(["Home"]);
    }
}