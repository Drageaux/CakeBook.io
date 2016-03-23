import {Component,EventEmitter,Input,Output,OnInit}  from "angular2/core";
import {NgForm}     from "angular2/common";
import {Json} from "angular2/src/facade/lang";
import {Observable} from "rxjs/Observable";

import {Cake}       from "./cake";
import {CakeService} from "./cake.service";
import {EditableItemForm} from "./editable-item-form.component";

@Component({
    selector: "add-cake-form",
    templateUrl: "templates/add-cake-form.component.html",
    directives: [EditableItemForm]
})

export class AddCakeFormComponent {
    @Output() saved = new EventEmitter<Cake>();

    ingrLabel = "Ingredients";
    stepLabel = "Steps";

    userId = JSON.parse(localStorage.getItem("profile")).user_id;
    @Input() model = new Cake(0, this.userId, "", "", "", "", [], []);
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
        this._cakeService.addCake(JSON.stringify(this.model))
            .subscribe(res => this.saved.emit(res));

        // TODO: Remove when there's a better way to reset the model
        this.model = new Cake(0, this.userId, "", "", "", "", [""], [""]);
        this.closeForm();
    }

    /* Ingredients and Steps */
    addOptionalItem(itemType:string, value:string) {
        if (itemType == "ingr") {
            // prevent spamming ingredients
            if (value != "") {
                this.model.ingredients.push(value);
                console.log(this.model.ingredients);
            }
        }
        else if (itemType == "step") {
            // prevent spamming steps
            if (value != "") {
                this.model.steps.push(value);
                console.log(this.model.steps);
            }
        }
    }

    removeOptionalItem(itemType:string, index:number) {
        if (itemType == "ingr") {
            if (this.model.ingredients.length <= 0) {
                return;
            }
            return this.model.ingredients.splice(index, 1);
        }
        else if (itemType == "step") {
            if (this.model.steps.length <= 0) {
                return;
            }
            return this.model.ingredients.splice(index, 1);
        }
    }

    saveEdit(itemType:string, obj:any) {
        if (itemType == "ingr") {
            this.model.ingredients[obj.index] = obj.value;
        }
        else if (itemType == "step") {
            this.model.steps[obj.index] = obj.value;
        }
    }


    /********************
     * Helper Functions *
     ********************/
    isEmptyString(str:string) {
        return str == "" || str == null;
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        return JSON.stringify(this.model);
    }
}