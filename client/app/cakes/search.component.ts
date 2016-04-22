import {Component, OnInit} from "angular2/core";
import {Router, RouteParams, CanActivate} from "angular2/router";
import {Observable} from "rxjs/Observable";

import {Cake} from "./cake";
import {CakeService} from "./cake.service";
import {ImportCakeFormComponent} from "./import-cake-form.component";
import {isEmpty} from "rxjs/operator/isEmpty";

@Component({
    templateUrl: "templates/search.component.html",
    directives: [ImportCakeFormComponent]
})

@CanActivate(() => localStorage.getItem("id_token"))
export class SearchComponent implements OnInit {
    lastSearch = this._routeParams.get("query");
    results:any = {};
    query = this._routeParams.get("query");
    dataString:string = "";
    readySubmit:boolean = false;
    currModel:Cake = null;

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
                });
        }
         else {
            this._service.searchCakes(
                this.query,
                this._routeParams.get(("start")),
                this._routeParams.get("end"))
                .subscribe(res => {
                    this.results = res.body;
                });
        }
    }

    goSearch(query:string, start:string, end:string) {
        if (query != "" && query != null) {
            if (this._service.isUrl(query)) {
                this._router.navigate(["Search", {
                        query: query,
                        start: -1,
                        end: -1
                    }]);
            } else {
                this._router.navigate(["Search", {
                        query: query,
                        start: start,
                        end: end
                    }]);
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
                }]);
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
                }]);
        }
    }

    getInfo(id:string) {
        // match id
        for (let i in this.results.results) {
            if (this.results.results[i]["id"] == id) {
                let cake = this.results.results[i];
                // check if already extracted by URL
                // else, extract from URL and import
                if (this._service.isUrl(this.lastSearch)) {
                    this.fillInfo(cake);
                } else {
                    this._service.searchCakeById(id)
                        .subscribe(res => {
                            if (res.body["sourceUrl"]) {
                                var newQuery = res.body["sourceUrl"];
                                newQuery = encodeURIComponent(newQuery);
                                this._service.extractCake(newQuery)
                                    .subscribe(res => this.fillInfo(res.body));
                            }
                        });
                }
            }
        }
    }

    fillInfo(cake:any) {
        this.dataString = "";
        // translate JSON data into desired string format
        this.dataString += cake.title + "\n\n";
        if (cake.readyInMinutes) {
            this.dataString += "(ready in " + cake.readyInMinutes + " minutes)";
        } else {
            this.dataString += "none"
        }
        this.dataString += "\n\n";
        // compile ingredient list
        for (let ingrIndex in cake.extendedIngredients) {
            this.dataString +=
                cake.extendedIngredients[ingrIndex]["originalString"] +
                "\n";
        }
        this.dataString += "\n";
        // compile step list
        if (cake.instructions) {
            // create a temporary element to extract instructions
            let divEl:any = document.createElement("div");
            divEl.innerHTML = cake.instructions;
            let instructionList = divEl.firstChild.children[0].children;
            for (let stepIndex in instructionList) {
                if (instructionList[stepIndex].innerHTML) {
                    this.dataString +=
                        instructionList[stepIndex].innerHTML +
                        "\n";
                }
            }
        }
        (<HTMLButtonElement> document.querySelector("[data-toggle='modal']")).click();
    }

    prepareSubmit(event:any) {
        if (this.isEmptyString(event["name"])) {
            this.readySubmit = false;
            this.currModel = null;
        } else {
            this.readySubmit = true;
            this.currModel = event;
        }
    }

    addCake() {
        if (!this.isEmptyString(this.currModel.name) && this.readySubmit) {
            this._service.addCake(JSON.stringify(this.currModel))
                .subscribe(res => {
                    this.currModel = null;
                    this._router.navigate(["CakeDetails", {id: res._id}]);
                });
        }
    }


    /********************
     * Helper Functions *
     ********************/
    isEmptyString(str:string) {
        return str == "" || str == null;
    }

    goHome() {
        this._router.navigate(["Home"]);
    }
}