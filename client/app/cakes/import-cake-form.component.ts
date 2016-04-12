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
    model = new Cake(0, this.userId, "", "", "", "", [], []);
    active = false;

    constructor(private _cakeService:CakeService) {
    }

    openForm() {
        this.active = true;
    }

    closeForm() {
        this.active = false;
    }

    importCake(value:string):Observable<Cake> {
        if (this.isEmptyString(this.modelString)) {
            return;
        }
        console.log(this.modelString)

        //this._cakeService.addCake(JSON.stringify(this.model))
        //    .subscribe(res => this.saved.emit(res));
        // TODO: Remove when there's a better way to reset the model
        //this.model = new Cake(0, this.userId, "", "", "", "", [], []);
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