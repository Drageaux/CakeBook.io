import {Component} from "angular2/core";
import {Cake} from "../cake";

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
        `,
    inputs: ["cake"]
})

export class CakeDetailComponent {
    public cake:Cake;
}