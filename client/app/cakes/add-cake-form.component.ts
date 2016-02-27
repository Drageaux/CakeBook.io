import {Component,EventEmitter}  from "angular2/core";
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

    ingrList:Object[] = [];
    currIngr = {"value": "", "editing": false};
    stepList:Object[] = [];
    currStep = {"value": ""};

    model = new Cake(0, "", [], []);
    active = false;

    constructor(private _cakeService:CakeService) {
        this.ingrList.push({"value": "somethig", "editing": false});
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
        if (this.currIngr.value != "") {
            this.ingrList.push(this.currIngr);
            this.currIngr = {"value": "", "editing": false};
        }
    }

    removeIngredient(index:number) {
        if (this.ingrList.length <= 0) {
            return;
        }
        return this.ingrList.splice(index, 1);
    }

    editIngredient(index:number) {
        console.log("clicked");
        this.ingrList[index]["editing"] = true;
    }

    addStep() {
        // prevent spamming step creation
        if (this.currStep.value != "") {
            this.stepList.push(this.currStep);
            this.currStep = {"value": ""};
        }
    }

    removeStep(index:number) {
        if (this.stepList.length <= 0) {
            return;
        }
        return this.stepList.splice(index, 1);
    }

    isEmptyString(str:string) {
        return str == "" || str == null;
    }

    isEditing(index:number) {
        return this.ingrList[index]["editing"];
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        return JSON.stringify(this.model);
    }
}