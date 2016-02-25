import {Component,EventEmitter}  from 'angular2/core';
import {NgForm}     from "angular2/common";
import {Cake}       from "./cake";
import {Observable} from "rxjs/Observable";
import {CakeService} from "./cake.service";
import {Output} from "angular2/core";
import {OnInit} from "angular2/core";

@Component({
    selector: "add-cake-form",
    templateUrl: "templates/add-cake-form.component.html"
})

export class AddCakeFormComponent {

    model = new Cake(0, "", [""], [""]);
    //@Output() saved = new EventEmitter();

    constructor(private _cakeService:CakeService) {
    }

    submitted = false;
    onSubmit() {
        this.submitted = true;
    }

    active = true;
    //addCake() {
    //    this.model = new Cake(10, "", [], []);
    //    this.active = false;
    //    setTimeout(() => this.active=true, 0);
    //}
    addCake(name:string):Observable<Cake> {
        if (!name) {
            return;
        }
        this._cakeService.addCake(JSON.stringify(this.model))
            .subscribe(res => console.log(res));

        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    // TODO: Remove this when we're done
    //get diagnostic() {
    //    return JSON.stringify(this.model);
    //}
}