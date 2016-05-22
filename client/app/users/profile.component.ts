import {Component, OnInit} from "@angular/core";
import {User} from "./user";
import {UserService} from "./user.service";
import {Cake} from "../cakes/cake";
import {CakeService} from "../cakes/cake.service";

@Component({
    selector: "profile",
    templateUrl: "templates/profile.component.html"
})

export class ProfileComponent implements OnInit {
    user:User = {};
    cakes:Cake[] = [];

    constructor(private userService:UserService,
                private cakeService:CakeService) {
    }

    ngOnInit() {
        this.userService.getUser()
            .subscribe(user => {
                this.user = user;
                this.cakeService.getCakes()
                    .subscribe(cakes => {
                        this.cakes = cakes;
                        console.log(this.cakes);
                    });
            });
    }

    isEmptyString(str:string) {
        return str == "" || str == null;
    }
}