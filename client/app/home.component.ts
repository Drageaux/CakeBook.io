import {Component, OnInit, Input}   from "@angular/core";
import {Router, CanActivate}        from "@angular/router-deprecated";
import {Observable}                 from "rxjs/Observable";

import {User}                       from "./users/user";
import {UserService}                from "./users/user.service";

import {Cake}                       from "./cakes/cake";
import {AddCakeFormComponent}       from "./cakes/add-cake-form.component";
import {ImportCakeFormComponent}    from "./cakes/import-cake-form.component";
import {CakeService}                from "./cakes/cake.service";

import {TransitionService}          from "./transition.service";

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
                private _userService:UserService,
                private _cakeService:CakeService,
                private _transitionService:TransitionService) {
    }

    ngOnInit() {
        if (!this._userService.isLoggedIn()) {
            this._router.navigate(["Login"]);
        } else {
            this.getCakes();
        }
    }

    getCakes() {
        this._cakeService.getCakes()
            .subscribe(
                cakes => this.cakes = this.sortCakeList(cakes),
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

    onAdded(heading:any, message:any) {
        this.getCakes();
        heading.click();
        this._transitionService.fadeToggleItem(message);
    }

    closeMessage(message:any) {
        this._transitionService.closeItem(message);
    }

    sortCakeList(array:Cake[]):Cake[] {
        let results:Cake[] = [];
        let favorite:Cake[] = [];
        let nonFavorite:Cake[] = [];

        for (let i in array) {
            if (array[i].isFavorite == true) {
                favorite.push(array[i]);
            } else {
                nonFavorite.push(array[i]);
            }
        }
        favorite.sort(function (first, second) {
            return first.name.localeCompare(second.name)
        });
        nonFavorite.sort(function (first, second) {
            return first.name.localeCompare(second.name)
        });

        favorite.push.apply(favorite, nonFavorite);
        results.push.apply(results, favorite);

        return results
    }
}
