import {Component, OnInit}              from 'angular2/core';
import {Router} from "angular2/router";

import {Cake}                   from "./cakes/cake";
import {CakeService}            from "./cakes/cake.service";
import {AddCakeFormComponent}   from "./add-cake-form.component";
import {Observable} from "rxjs/Observable";

@Component({
    template: `
        <div class="general-container">
            <h2>Caker Profile</h2>
            <h3>My Cakes</h3>
            <ul>
                <li>
                    <input #newCake>
                    <button (click)="addCake(newCake.value); newCake.value=''">
                        Add Cake
                    </button>
                    <div class="error" *ngIf="errorMessage">
                        {{errorMessage}}
                    </div>
                </li>
                <li *ngFor="#cake of cakes"
                    (click)="onSelect(cake)">
                    <a class="url-list-item">{{cake.name}}</a>
                </li>
            </ul>
        </div>
        `,
    styles: [`
        .error {
            color:red:
        }
        `],
    directives: [AddCakeFormComponent]
})

export class ProfileComponent implements OnInit {
    errorMessage:string;
    cakes:Cake[];

    constructor(private _router:Router, private _cakeService:CakeService) {
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
        this._router.navigate(["CakeDetail", {id: cake.id}]);
    }

    addCake(name:string):Observable<Cake> {
        if (!name) {
            return;
        }
        this._cakeService.addCake(name)
            .subscribe(
                cake => this.cakes.push(cake),
                error => this.errorMessage = <any>error);
    }
}
