import {Component}              from 'angular2/core';
import {TopNavComponent}        from "./top-nav.component";
import {Cake}                   from "./cake";
import {CakeDetailComponent}    from "./cakes/cake-detail.component";
import {CakeService}            from "./cakes/cake.service";
import {AddCakeFormComponent}   from "./add-cake-form.component";

// Need to be imported later on for some reason
import {ViewEncapsulation}        from "angular2/core";

@Component({
    selector: 'my-app',
    template: `
		<top-nav></top-nav>

		<h2>Caker Profile</h2>
		<h3>My Cakes</h3>
		<ul>
		    <li>
                <add-cake-form></add-cake-form>
            </li>
			<li *ngFor="#cake of cakes"
	            (click)="onSelect(cake)">
				<a>{{cake.name}}</a>
			</li>
		</ul>
		<hr>
		<cake-detail [cake]="currentCake"></cake-detail>
		`,
    styleUrls: ["app/main.css"],
    encapsulation: ViewEncapsulation.None,
    directives: [TopNavComponent, AddCakeFormComponent, CakeDetailComponent],
    providers: [CakeService]
})

export class AppComponent {
    public cakes: Cake[];
    currentCake:Cake;

    constructor(private _cakeService: CakeService) { }

    getCakes() {
        this._cakeService.getCakes().then(cakes => this.cakes = cakes);
    }

    onSelect(cake:Cake) {
        this.currentCake = cake;
    }

    ngOnInit() {
        this.getCakes();
    }
}

