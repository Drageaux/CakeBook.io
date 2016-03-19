import {Component, OnInit, Input} from 'angular2/core';
import {Location, Router} from "angular2/router";
import {Observable} from "rxjs/Observable";

import {Cake}                   from "./cakes/cake";
import {AddCakeFormComponent}   from "./cakes/add-cake-form.component";
import {CakeService}            from "./cakes/cake.service";
import {CanActivate} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";

@Component({
    templateUrl: "templates/home.component.html",
    directives: [AddCakeFormComponent]
})

@CanActivate(() => tokenNotExpired())
export class HomeComponent implements OnInit {
    errorMessage:string;
    @Input() cakes:Cake[];

    constructor(private _router:Router,
                private _cakeService:CakeService) {
    }

    ngOnInit() {
        if (!tokenNotExpired()) {
            this._router.navigate(["Login"]);
        }
        this.getCakes();

    }

    getCakes() {
        this._cakeService.getCakes()
            .subscribe(
                cakes => this.cakes = cakes,
                error => this.errorMessage = <any>error,
                () => console.log(this.cakes));
    }

    onSelect(cake:Cake) {
        this._router.navigate(["CakeDetails", {id: cake._id}]);
    }

    onAdded(cake:Cake) {
        this.cakes.push(cake);
    }
}
