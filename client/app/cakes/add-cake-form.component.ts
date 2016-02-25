import {Component,EventEmitter}  from 'angular2/core';
import {NgForm}     from "angular2/common";
import {Cake}       from "./cake";
import {Observable} from "rxjs/Observable";
import {CakeService} from "./cake.service";
import {Output} from "angular2/core";
import {OnInit} from "angular2/core";
import {Json} from "angular2/src/facade/lang";

@Component({
    selector: "add-cake-form",
    templateUrl: "templates/add-cake-form.component.html"
})

export class AddCakeFormComponent {

    ingrList:Object[] = [
        {
            "value": "lol"
        },
        {
            "value": "what"
        }
    ];
    stepList = [""];
    model = new Cake(0, "", [], []);
    active = false;
    @Output() saved = new EventEmitter<Cake>();

    constructor(private _cakeService:CakeService) {
        console.log(this.ingrList)
    }

    openForm() {
        this.active = true;
    }

    closeForm() {
        this.active = false;
    }

    addCake(name:string):Observable<Cake> {
        if (!name) {
            return;
        }
        this._cakeService.addCake(JSON.stringify(this.model))
            .subscribe(res => this.saved.emit(res));

        // Reset the model
        // TODO: Remove when there's a better way
        this.model = new Cake(0, "", [""], [""]);
        this.closeForm();
    }

    addIngredient(){
        // prevent spamming ingredient creation
        let lastIndex = Object.keys(this.ingrList[this.ingrList.length-1]).length;
        if (lastIndex == 0){
            return;
        }
        this.ingrList.push({});
        console.log(this.ingrList)
    }

    // TODO: Remove this when we're done
    //get diagnostic() {
    //    return JSON.stringify(this.model);
    //}
}