import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {OnInit} from "angular2/core";
import {error} from "util";
import {Cake} from "./cake";
import {CakeService} from "./cake.service";

@Component({
    selector: "cake-detail",
    template: `
        <div *ngIf="cake">
            <div class="error" *ngIf="errorMessage">
                {{errorMessage}}
            </div>
			<h4>Details: {{cake.name}}</h4>
			<ul><label><b>Ingredients</b></label>
				<li *ngFor="#ingr of cake.ingredients">
					{{ingr}}
				</li>
			</ul>
			<ol><label><b>Steps</b></label>
				<li *ngFor="#step of cake.steps">
					{{step}}
				</li>
			</ol>
		</div>
		<button (click)="gotoCakes()">Back</button>
        `
})

export class CakeDetailComponent implements OnInit {
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

    gotoCakes() {
        this._router.navigate(["Cakes"]);
    }
}