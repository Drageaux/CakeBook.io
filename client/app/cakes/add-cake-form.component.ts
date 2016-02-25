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

    @Output() saved = new EventEmitter<Cake>();

    ingrList:Object[] = [
        {"value": ""},
        {"value": ""},
        {"value": ""}
    ];
    stepList:Object[] = [
        {"value": ""},
        {"value": ""},
        {"value": ""}
    ];
    model = new Cake(0, "", [], []);
    active = false;

    constructor(private _cakeService:CakeService) {
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

        // parse lists of ingredients and steps and insert to the model
        for (let i = 0; i < this.ingrList.length; i++) {
            let currIngr = this.ingrList[i]["value"];
            if (currIngr != "") {
                this.model.ingredients.push(currIngr);
            }
        }
        for (let i = 0; i < this.stepList.length; i++) {
            let currStep = this.stepList[i]["value"];
            if (currStep != "") {
                this.model.steps.push(currStep);
            }
        }

        this._cakeService.addCake(JSON.stringify(this.model))
            .subscribe(res => this.saved.emit(res));

        // TODO: Remove when there's a better way to reset the model
        this.model = new Cake(0, "", [""], [""]);
        this.closeForm();
    }

    addIngredient() {
        // prevent spamming ingredient creation
        let lastIndex = Object.keys(this.ingrList[this.ingrList.length - 1]).length;
        if (lastIndex == 0) {
            return;
        }
        this.ingrList.push({});
    }

    addStep() {
        // prevent spamming ingredient creation
        let lastIndex = Object.keys(this.stepList[this.stepList.length - 1]).length;
        if (lastIndex == 0) {
            return;
        }
        this.stepList.push({});
    }

    // TODO: Remove this when we're done
    //get diagnostic() {
    //    return JSON.stringify(this.model);
    //}
}