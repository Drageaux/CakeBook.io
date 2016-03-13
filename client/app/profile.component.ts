import {Component, Input} from "angular2/core";
import {Router} from "angular2/router";

import {User} from "./users/user";
import {UserService} from "./users/user.service";

@Component({
    templateUrl: "templates/profile.component.html"
})

export class ProfileComponent{
    errorMessage:string;
    @Input() user:User;

    constructor(private _location:Location,
                private _router:Router,
                private _userService:UserService) {
    }

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        this._userService.getUser()
            //.subscribe(
            //    user => this.user = user,
            //    error => this.errorMessage = <any>error);
    }

}
