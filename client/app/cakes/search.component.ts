import {Component, OnInit} from "angular2/core";
import {Router, RouteParams, CanActivate} from "angular2/router";
import {Observable} from "rxjs/Observable";

import {CakeService} from "./cake.service";

@Component({
    templateUrl: "templates/search.component.html"
})

@CanActivate(() => localStorage.getItem("id_token"))
export class SearchComponent implements OnInit {
    lastSearch = this._routeParams.get("query");
    results:any = {};
    query = this._routeParams.get("query");

    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _service:CakeService) {
    }

    ngOnInit() {
        if (this._service.isUrl(this.query)) {
            let encodedQuery = encodeURIComponent(this.query);
            this._service.extractCake(encodedQuery)
                .subscribe(res => {
                    this.results = {"results": []};
                    this.results["results"].push(res.body);
                    console.log(this.results);
                });
        } else {
            this._service.searchCakes(
                this.query,
                this._routeParams.get(("start")),
                this._routeParams.get("end"))
                .subscribe(res => this.results = res.body);
        }
    }

    goSearch(query:string, start:string, end:string) {
        if (query != "" && query != null) {
            if (this._service.isUrl(query)) {
                this._router.navigate(["Search", {
                        query: query,
                        start: -1,
                        end: -1
                    }]
                );
            } else {
                this._router.navigate(["Search", {
                        query: query,
                        start: start,
                        end: end
                    }]
                );
            }
        }
    }

    goSearchPrevious() {
        let query = this._routeParams.get("query");
        let start = parseInt(this._routeParams.get("start")) - 10;
        if (start < 1) {
            start = 1
        }
        let end = start + 9;
        if (query != "" && query != null) {
            this._router.navigate(["Search", {
                    query: query,
                    start: start,
                    end: end
                }]
            );
        }
    }

    goSearchNext() {
        let query = this._routeParams.get("query");
        let start = parseInt(this._routeParams.get("start")) + 10;
        let end = start + 9;
        if (query != "" && query != null) {
            this._router.navigate(["Search", {
                    query: query,
                    start: start,
                    end: end
                }]
            );
        }
    }

    getInfo(id:string) {
        // Get info to redirect and import the cake
    }

    isEmptyString(str:string) {
        return str == "" || str == null;
    }

    goHome() {
        this._router.navigate(["Home"]);
    }
}