import {Component}  from 'angular2/core';
import {NgForm}     from "angular2/common";
import {Cake}       from "./cake";

@Component({
    selector: "add-cake-form",
    templateUrl: "app/add-cake-form.component.html"
})

export class AddCakeFormComponent {
    submitted = false;

    addCake(newCake:Cake, CakeList:Cake[]) {
        if (newCake) {
            CakeList.push(newCake);
        }
    }

    onSubmit() {
        this.submitted = true;
    }
}