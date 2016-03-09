import {Component, OnInit, Input} from 'angular2/core';
import {Location, Router} from "angular2/router";
import {Observable} from "rxjs/Observable";

import {Cake}                   from "./cakes/cake";
import {AddCakeFormComponent}   from "./cakes/add-cake-form.component";
import {CakeService}            from "./cakes/cake.service";

@Component({
    //template: `
    //    <div class="home-container">
    //        <h1 class="welcome-poster">Welcome to Cake Book!</h1>
    //        <h2>Home</h2>
    //        <h3>My Cakes</h3>
    //        <div class="cake-list list-group">
    //            <add-cake-form (saved)="onAdded($event)"></add-cake-form>
    //            <!--<div class="error" *ngIf="errorMessage">-->
    //                <!--{{errorMessage}}-->
    //            <!--</div>-->
    //            <a class="list-group-item" *ngFor="#cake of cakes"
    //            (click)="onSelect(cake)">{{cake.name}}</a>
    //        </div>
    //    </div>
    //    `,
    templateUrl: "templates/home.component.html",
    directives: [AddCakeFormComponent]
})

export class HomeComponent implements OnInit {
    errorMessage:string;
    @Input() cakes:Cake[];

    constructor(private _location:Location,
                private _router:Router,
                private _cakeService:CakeService) {
    }

    ngOnInit() {
        this.getCakes();
    }

    getCakes() {
        this._cakeService.getCakes()
            .subscribe(
                cakes => this.cakes = cakes,
                error => this.errorMessage = <any>error);
    }

    onSelect(cake:Cake) {
        this._router.navigate(["CakeDetail", {id: cake._id}]);
    }

    onAdded(cake:Cake) {
        this.cakes.push(cake);
    }
}
