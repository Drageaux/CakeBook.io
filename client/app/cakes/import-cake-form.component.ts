import {Component,EventEmitter,Input,Output}  from "angular2/core";
import {NgForm}     from "angular2/common";
import {Json} from "angular2/src/facade/lang";
import {Observable} from "rxjs/Observable";

import {Cake}       from "./cake";
import {CakeService} from "./cake.service";

@Component({
    selector: "import-cake-form",
    templateUrl: "templates/import-cake-form.component.html",
})

export class ImportCakeFormComponent {
    userId = JSON.parse(localStorage.getItem("profile")).user_id; // must be defined first

    @Output() saved = new EventEmitter<Cake>();
    modelString = "";
    model = new Cake(0, false, this.userId, "", "", "", "", [], []);
    active = false;
    tooltipTitle = `
        <p style='text-align:left; padding: 5px; margin-bottom: 0'>
            <b>How To</b>:<br>
            - Add an empty line to <i>separate each detail group</i><br>
            - Add a new line <i>for each ingredient/step</i><br>
            - Type 'none' or 'None' to <i>leave blank</i><br>
            <br>
            <b>Template</b>:
        </p>
<pre style='margin-top: 0; text-align: left'>*name*

*description*

*ingredient #1*
*ingredient #2*
*ingredient #3*

*step #1*
*step #2*</pre>
        `;

    constructor(private _cakeService:CakeService) {
    }

    openForm() {
        this.active = true;
    }

    closeForm() {
        this.active = false;
    }

    parsePreview() {
        // split into list of elements
        let cursor;
        let isIngr = true;
        let indexIngr = 0;
        let isStep = false;
        let indexStep = 0;
        let modelArray = this.modelString.split("\n");

        if (modelArray[0]) {
            this.model.name = modelArray[0];
        }
        if (modelArray[2]) {
            this.model.description = modelArray[2];
        }

        cursor = 4;
        while (isIngr) {
            if (modelArray[cursor] && modelArray[cursor].toLowerCase() != "none") {
                this.model.ingredients[indexIngr] = {
                    "index": indexIngr,
                    "value": modelArray[cursor]
                };
            } else if (modelArray[cursor] && modelArray[cursor].toLowerCase() == "none") {
                this.model.ingredients = [];
            }
            else {

                isIngr = false;
                break;
            }
            indexIngr++;
            cursor++;
        }

        cursor++;
        isStep = true;
        while (isStep) {
            if (modelArray[cursor] && modelArray[cursor].toLowerCase() != "none") {
                this.model.steps[indexStep] = {
                    "index": indexStep,
                    "value": modelArray[cursor]
                };
            } else if (modelArray[cursor] && modelArray[cursor].toLowerCase() == "none") {
                this.model.steps = [];
            }
            else {
                isStep = false;
                break;
            }
            indexStep++;
            cursor++;
        }
    }

    importCake():Observable<Cake> {
        if (this.isEmptyString(this.modelString) || this.isEmptyString(this.model.name)) {
            return;
        }

        this.parsePreview();
        this._cakeService.addCake(JSON.stringify(this.model))
            .subscribe(res => this.saved.emit(res));
        // TODO: Remove when there's a better way to reset the model
        this.model = new Cake(0, false, this.userId,
            "", "", "", "", [], []);
        this.closeForm();
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