import {Component}  from 'angular2/core';
import {Cake}       from "./cake";
import {AddCakeFormComponent} from "./add-cake-form.component";

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
			<li *ngFor="#cake of cakes">
				{{cake.name}}
			</li>
		</ul>
		`,
    directives: [AddCakeFormComponent]
})

export class AppComponent {
	title = "Cake Book";
	cakes = [
		new Cake(1, "Slow Cooker Chocolate Lava Cake"),
		new Cake(2,"S’mores Pizza Roll-Up"),
		new Cake(3,"S'mores Dip"),
		new Cake(4,"Easy No-Bake Chocolate-Ricotta Cake"),
		new Cake(5,"Chocolate Mousse")
	];
	currentCake = this.cakes[0];
}

