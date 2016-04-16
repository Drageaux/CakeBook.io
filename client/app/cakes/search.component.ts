import {Component, OnInit} from "angular2/core";
import {Router, RouteParams, CanActivate} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";
import {Observable} from "rxjs/Observable";

import {CakeService} from "./cake.service";

@Component({
    template: `
        <div class="general-container">
            <ul>
                <li *ngFor="#result of results.results">
                    {{result.title}} (ready in {{result.readyInMinutes}})
                </li>
            </ul>
        </div>
    `
})

@CanActivate(() => tokenNotExpired())
export class SearchComponent implements OnInit {
    results:any = {};

    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _service:CakeService) {
    }

    ngOnInit() {
        let query = this._routeParams.get('query');
        console.log(query);

        //this._service.searchCakes(query)
        //    .subscribe(
        //        res => this.results = res.body,
        //        () => console.log(this.results)
        //    );
    }

    isEmptyString(str:string) {
        return str == "" || str == null;
    }

    gotoCakes() {
        this._router.navigate(["Home"]);
    }
}