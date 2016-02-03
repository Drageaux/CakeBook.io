import {Component} from "angular2/core";
import {Cake} from "../cake";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {CakeService} from "./cake.service";
import {OnInit} from "angular2/core";

@Component({
    selector: "cake-detail",
    template: `
        <div *ngIf="cake">
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
        `,
})

export class CakeDetailComponent implements OnInit {
    cake:Cake;

    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _service:CakeService) {
    }

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._service.getCake(id).then(cake => this.cake = cake);
    }

    gotoCakes() {
        this._router.navigate(["Cakes"]);
    }
}