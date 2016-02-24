//import {Component, OnInit} from 'angular2/core';
//import {Location, Router} from "angular2/router";
//import {Observable} from "rxjs/Observable";
//
//import {Cake}                   from "./cakes/cake";
//import {CakeService}            from "./cakes/cake.service";
//import {AddCakeFormComponent}   from "./cakes/add-cake-form.component.ts";
//
//@Component({
//    template: `
//        <div class="general-container">
//            <h2>Caker Profile</h2>
//            <h3>My Cakes</h3>
//            <ul>
//                <li>
//                    <input #newCake>
//                    <button (click)="addCake(newCake.value); newCake.value=''">
//                        Add Cake
//                    </button>
//                    <div class="error" *ngIf="errorMessage">
//                        {{errorMessage}}
//                    </div>
//                </li>
//                <li *ngFor="#cake of cakes"
//                    (click)="onSelect(cake)">
//                    <a class="url-list-item">{{cake.name}}</a>
//                </li>
//            </ul>
//        </div>
//        `,
//    directives: [AddCakeFormComponent]
//})
//
//export class ProfileComponent implements OnInit {
//    errorMessage:string;
//    cakes:Cake[];
//
//    constructor(private _location:Location,
//                private _router:Router,
//                private _cakeService:CakeService) {
//    }
//
//    ngOnInit() {
//        this.getCakes();
//    }
//
//    getCakes() {
//        this._cakeService.getCakes()
//            .subscribe(
//                cakes => this.cakes = cakes,
//                error => this.errorMessage = <any>error);
//    }
//
//    onSelect(cake:Cake) {
//        this._router.navigate(["CakeDetail", {id: cake._id}]);
//    }
//
//    addCake(name:string):Observable<Cake> {
//        if (!name) {
//            return;
//        }
//        this._cakeService.addCake(name)
//            .subscribe(
//                cake => this.cakes.push(cake) && console.log(cake),
//                error => this.errorMessage = <any>error);
//    }
//}
//# sourceMappingURL=profile.component.js.map