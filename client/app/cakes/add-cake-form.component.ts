import {Component,EventEmitter,Input,Output,OnInit}  from "angular2/core";
import {NgForm}     from "angular2/common";
import {Json} from "angular2/src/facade/lang";
import {Observable} from "rxjs/Observable";

import {Cake}       from "./cake";
import {EditableItemForm} from "./editable-item-form.component";
import {CakeService} from "./cake.service";

declare var jQuery;

@Component({
    selector: "add-cake-form",
    templateUrl: "templates/add-cake-form.component.html",
    directives: [EditableItemForm]
})

export class AddCakeFormComponent implements OnInit {
    userId = JSON.parse(localStorage.getItem("profile")).user_id; // must be defined first

    @Output() saved = new EventEmitter<Cake>();
    model = new Cake(0, false, this.userId, "", "", "", "", [], []);

    constructor(private _cakeService:CakeService) {
    }

    ngOnInit() {
        jQuery("#addCakeForm").form({
            fields: {
                name: {
                    identifier: "cakeName",
                    rules: [
                        {
                            type: "minLength[5]",
                            prompt: "Cake name must have at least 5 characters"
                        }
                    ]
                }
            }
        });
    }

    clearForm() {
        this.model = new Cake(0, false, this.userId, "", "", "", "", [], []);
        jQuery("#cakeName").blur();
        jQuery("#addCakeForm").form('reset');
        jQuery("#addErrorMessage").empty();
    }

    addCake():Observable<Cake> {
        if (this.model.name.length < 5) {
            return;
        }

        this._cakeService.addCake(JSON.stringify(this.model))
            .subscribe(res => {
                this.saved.emit(res);
                this.clearForm();
            });
        // TODO: Remove when there's a better way to reset the model
    }

    togglePublicity() {
        if (this.model.isPublic != null) {
            this.model.isPublic = !this.model.isPublic;
            (<HTMLInputElement> document.getElementById("publicToggleAdd")).checked
                = this.model.isPublic;
        } else {
            this.model.isPublic = true;
            (<HTMLInputElement> document.getElementById("publicToggleAdd")).checked
                = true;
        }
    }

    updateDescription(input:string) {
        this.model.description = input;
    }

    /* Ingredients and Steps */
    addOptionalItem(itemType:string, value:string) {
        if (itemType == "ingr") {
            // prevent spamming ingredients
            if (value != "") {
                this.model.ingredients.push({
                    "index": this.model.ingredients.length,
                    "value": value
                });
            }
        }
        else if (itemType == "step") {
            // prevent spamming steps
            if (value != "") {
                this.model.steps.push({
                    "index": this.model.steps.length,
                    "value": value
                });
            }
        }
    }

    removeOptionalItem(itemType:string, index:number) {
        if (itemType == "ingr") {
            if (this.model.ingredients.length <= 0) {
                return;
            }
            this.model.ingredients.splice(index, 1);
            for (let i = 0; i < this.model.ingredients.length; i++) {
                this.model.ingredients[i]["index"] = i;
            }
        }
        else if (itemType == "step") {
            if (this.model.steps.length <= 0) {
                return;
            }
            this.model.steps.splice(index, 1);
            for (let i = 0; i < this.model.steps.length; i++) {
                this.model.steps[i]["index"] = i;
            }
        }
    }

    saveEdit(itemType:string, obj:any) {
        if (itemType == "ingr") {
            this.model.ingredients[obj.index]["value"] = obj.value;
        }
        else if (itemType == "step") {
            this.model.steps[obj.index]["value"] = obj.value;
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