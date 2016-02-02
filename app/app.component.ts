import {Component}  			from 'angular2/core';
import {Cake}       			from "./cake";
import {AddCakeFormComponent} 	from "./add-cake-form.component";

@Component({
	selector: 'my-app',
	template: `
		<h1>{{title}}</h1>
		<h2>Caker Profile</h2>
		<h3>My Cakes</h3>
		<ul>
		    <li>
                <add-cake-form></add-cake-form>
            </li>
			<li *ngFor="#cake of cakes"
	            (click)="onSelect(cake)">
				<a href="#">{{cake.name}}</a>
			</li>
		</ul>
		<br>

		<!--<div *ngIf="currentCake">-->
		<div *ngIf="currentCake">
			<h4>Details: {{currentCake.name}}</h4>
			<ul><label><b>Ingredients</b></label>
				<li *ngFor="#ingr of currentCake.ingredients">
					{{ingr}}
				</li>
			</ul>
			<ol><label><b>Steps</b></label>
				<li *ngFor="#step of currentCake.steps">
					{{step}}
				</li>
			</ol>
		</div>
		`,
    directives: [AddCakeFormComponent]
})

export class AppComponent {
	title = "Cake Book";
	cakes = [
		new Cake(1, "Slow Cooker Chocolate Lava Cake", [], []),
		new Cake(2, "S’mores Pizza Roll-Up", [], []),
		new Cake(3, "S'mores Dip", [], []),
		new Cake(4, "Easy No-Bake Chocolate-Ricotta Cake",
			[
				"combine 2 parts melted semi sweet chocolate with 3 parts ricotta cheese",
				"layer with chocolate graham crackers until your selected dish is full",
				"refrigerate at least 8 hours, up to 48"
			],
			[
				"8 oz semi sweet chocolate",
				"chocolate graham crackers",
				"12 oz ricotta cheese",
			]),
		new Cake(5, "Chocolate Mousse", [], [])
	];
	currentCake: Cake;


	onSelect(cake: Cake){
		this.currentCake = cake;
	}

}

