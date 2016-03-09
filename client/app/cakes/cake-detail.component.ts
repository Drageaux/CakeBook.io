import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {OnInit} from "angular2/core";

import {Cake} from "./cake";
import {CakeService} from "./cake.service";
import {subscribeOn} from "rxjs/operator/subscribeOn";

@Component({
    selector: "cake-detail",
    template: `
        <div class="general-container">
            <div *ngIf="cake">
                <div class="error" *ngIf="errorMessage">
                    {{errorMessage}}
                </div>
                <h4>Details: {{cake.name}}</h4>
                <hr>
                <label><b>Ingredients</b></label>
                <ul>
                    <li *ngFor="#ingr of cake.ingredients">
                        {{ingr}}
                    </li>
                </ul>
                <span *ngIf="cake.ingredients.length == 0">(no ingredients specified)</span>
                <br>
                <br>
                <label><b>Steps</b></label>
                <ol>
                    <li *ngFor="#step of cake.steps">
                        {{step}}
                    </li>
                </ol>
                <span *ngIf="cake.steps.length == 0">(no ingredients specified)</span>
            </div>
            <hr>

            <button class="btn btn-default" (click)="gotoCakes()">Back</button>
            <button style="{float:right}" class="btn btn-danger" (click)="deleteCake(cake._id)">Remove This Cake</button>
        </div>
        `
})

export class CakeDetailComponent implements OnInit {
    errorMessage:string;
    cake:Cake;

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

    deleteCake(id:number) {
        this._service.deleteCake(id)
            .subscribe(
                res => this._router.navigate(["Home"]));
    }

    gotoCakes() {
        this._router.navigate(["Home"]);
    }
}