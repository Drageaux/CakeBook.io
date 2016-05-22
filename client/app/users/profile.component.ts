import {Component, OnInit} from "@angular/core";
import {User} from "./user";
import {UserService} from "./user.service";

@Component({
    selector: "profile",
    templateUrl: "templates/profile.component.html"
})

export class ProfileComponent implements OnInit {
    user:User = {};

    constructor(private service:UserService) {
    }

    ngOnInit() {
        this.service.getUser()
            .subscribe(res => this.user = res);
    }
}