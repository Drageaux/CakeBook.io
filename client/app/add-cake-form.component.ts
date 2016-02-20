import {Component}  from 'angular2/core';
import {NgForm}     from "angular2/common";
import {Cake}       from "./cakes/cake";

@Component({
    selector: "add-cake-form",
    templateUrl: "templates/add-cake-form.component.html"
})

export class AddCakeFormComponent {

    model = new Cake(10, "Easy Chocolate Chip Brownie Cheesecake", [
        "1 box of brownie mix, and ingredients needed to make them",
        "16 oz cream cheese, softened",
        "1 cup sugar",
        "1 tsp vanilla",
        "8 oz whipped cream or whipped topping",
        "1 cup chocolate chips"
    ],
    [
        "Prepare the brownie mix according to package instructions, and pour the batter into a springform pan.",
        "Bake according to package instructions, and cool completely.",
        "Meanwhile, beat cream cheese and sugar until smooth.",
        "Fold in vanilla and whipped cream, then fold in the chocolate chips.",
        "Spread over the cooled brownie in the springform pan."
    ]);

    submitted = false;
    onSubmit() {
        this.submitted = true;
    }

    active = true;
    addCake() {
        this.model = new Cake(10, "", [], []);
        this.active = false;
        setTimeout(() => this.active=true, 0);
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }
}