import {Component, OnInit} from "@angular/core";
import {Router, RouteParams, CanActivate} from "@angular/router-deprecated";

import {User} from "./user";
import {UserService} from "./user.service";
import {Cake} from "../cakes/cake";
import {CakeService} from "../cakes/cake.service";

@Component({
    selector: "profile",
    templateUrl: "templates/profile.component.html"
})

@CanActivate(() => localStorage.getItem("id_token"))
export class ProfileComponent implements OnInit {
    localProfile = {};
    user:User = {};
    cakes:Cake[] = [];

    constructor(private router:Router,
                private routeParams:RouteParams,
                private userService:UserService,
                private cakeService:CakeService) {
    }

    ngOnInit() {
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(["Login"]);
        } else {
            this.localProfile = this.userService.getLocalProfile();
            this.userService.getUser(this.routeParams.get("user"))
                .subscribe(user => {
                    this.user = user;
                    this.cakeService.getCakes(this.user.userId)
                        .subscribe(cakes => this.cakes = cakes);
                });
        }
    }

    isMyPage() {
        let decodedParams = decodeURIComponent(this.routeParams.get("user"));
        return (this.localProfile.user_id === decodedParams)
    }

    isEmptyString(str:string) {
        return str == "" || str == null;
    }
}