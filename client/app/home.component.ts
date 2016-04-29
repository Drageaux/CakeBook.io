import {Component, OnInit, Input} from 'angular2/core';
import {Router} from "angular2/router";
import {Observable} from "rxjs/Observable";

import {Cake}                   from "./cakes/cake";
import {AddCakeFormComponent}   from "./cakes/add-cake-form.component";
import {ImportCakeFormComponent}   from "./cakes/import-cake-form.component";
import {CakeService}            from "./cakes/cake.service";
import {CanActivate} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";
import {TransitionService} from "./transition.service";

declare var jQuery;

@Component({
    templateUrl: "templates/home.component.html",
    directives: [AddCakeFormComponent, ImportCakeFormComponent]
})

@CanActivate(() => localStorage.getItem("id_token"))
export class HomeComponent implements OnInit {
    errorMessage:string;
    @Input() cakes:Cake[];

    constructor(private _router:Router,
                private _cakeService:CakeService,
                private _transitionService:TransitionService) {
    }

    ngOnInit() {
        if (!localStorage.getItem("id_token")) {
            this._router.navigate(["Login"]);
        }
        this.getCakes();
    }

    getCakes() {
        this._cakeService.getCakes()
            .subscribe(
                cakes => this.cakes = cakes,
                error => this.errorMessage = <any>error);
    }

    goSearch(query:string) {
        if (this._cakeService.isUrl(query)) {
            this._router.navigate(["Search", {
                    query: query,
                    start: -1,
                    end: -1
                }]
            );
        } else {
            if (query != "" && query != null) {
                this._router.navigate(["Search", {
                        query: query,
                        start: 1,
                        end: 10
                    }]
                );
            }
        }
    }

    onSelect(cake:Cake) {
        this._router.navigate(["CakeDetails", {id: cake._id}]);
    }

    onAdded(cake:Cake, heading:any, message:any) {
        this.cakes.push(cake);
        heading.click();
        this._transitionService.fadeToggleItem(message);
    }

    closeMessage(message:any) {
        this._transitionService.closeItem(message);
    }
}
