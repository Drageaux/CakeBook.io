import {Component, OnInit}              from 'angular2/core';
import {Router} from "angular2/router";

import {Cake}                   from "./cake";
import {CakeService}            from "./cakes/cake.service";
import {AddCakeFormComponent}   from "./add-cake-form.component";

@Component({
    template: `
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
        `
})

export class ProfileComponent implements OnInit {
    cakes:Cake[];

    constructor(private _router:Router, private _cakeService:CakeService) {
    }

    getCakes() {
        this._cakeService.getCakes().then(cakes => this.cakes = cakes);
    }

    ngOnInit() {
        this.getCakes();
    }

    onSelect(cake:Cake) {
        this._router.navigate(['CakeDetail', {id: cake.id}]);
    }
}
