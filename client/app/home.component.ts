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
    localProfile = {};
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
            this.localProfile = this._userService.getLocalProfile();
            this._userService.getUser(this.localProfile.user_id)
                .subscribe(user => {
                    this.user = user;
                    this.getCakes(user.userId);
                });
        }
    }

    getCakes(id:string) {
        this._cakeService.getCakes(id)
            .subscribe(
                cakes => this.cakes = this._cakeService.sortCakeList(cakes),
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
}
