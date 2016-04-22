System.register(["angular2/core", "angular2/router", "./cake.service", "./import-cake-form.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, cake_service_1, import_cake_form_component_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            },
            function (import_cake_form_component_1_1) {
                import_cake_form_component_1 = import_cake_form_component_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(_router, _routeParams, _service) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._service = _service;
                    this.lastSearch = this._routeParams.get("query");
                    this.results = {};
                    this.query = this._routeParams.get("query");
                    this.dataString = "";
                    this.readySubmit = false;
                    this.currModel = null;
                }
                SearchComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this._service.isUrl(this.query)) {
                        var encodedQuery = encodeURIComponent(this.query);
                        this._service.extractCake(encodedQuery)
                            .subscribe(function (res) {
                            _this.results = { "results": [] };
                            _this.results["results"].push(res.body);
                        });
                    }
                    else {
                        this._service.searchCakes(this.query, this._routeParams.get(("start")), this._routeParams.get("end"))
                            .subscribe(function (res) {
                            _this.results = res.body;
                        });
                    }
                };
                SearchComponent.prototype.goSearch = function (query, start, end) {
                    if (query != "" && query != null) {
                        if (this._service.isUrl(query)) {
                            this._router.navigate(["Search", {
                                    query: query,
                                    start: -1,
                                    end: -1
                                }]);
                        }
                        else {
                            this._router.navigate(["Search", {
                                    query: query,
                                    start: start,
                                    end: end
                                }]);
                        }
                    }
                };
                SearchComponent.prototype.goSearchPrevious = function () {
                    var query = this._routeParams.get("query");
                    var start = parseInt(this._routeParams.get("start")) - 10;
                    if (start < 1) {
                        start = 1;
                    }
                    var end = start + 9;
                    if (query != "" && query != null) {
                        this._router.navigate(["Search", {
                                query: query,
                                start: start,
                                end: end
                            }]);
                    }
                };
                SearchComponent.prototype.goSearchNext = function () {
                    var query = this._routeParams.get("query");
                    var start = parseInt(this._routeParams.get("start")) + 10;
                    var end = start + 9;
                    if (query != "" && query != null) {
                        this._router.navigate(["Search", {
                                query: query,
                                start: start,
                                end: end
                            }]);
                    }
                };
                SearchComponent.prototype.getInfo = function (id) {
                    var _this = this;
                    // match id
                    for (var i in this.results.results) {
                        if (this.results.results[i]["id"] == id) {
                            var cake = this.results.results[i];
                            // check if already extracted by URL
                            // else, extract from URL and import
                            if (this._service.isUrl(this.lastSearch)) {
                                this.fillInfo(cake);
                            }
                            else {
                                this._service.searchCakeById(id)
                                    .subscribe(function (res) {
                                    if (res.body["sourceUrl"]) {
                                        var newQuery = res.body["sourceUrl"];
                                        newQuery = encodeURIComponent(newQuery);
                                        _this._service.extractCake(newQuery)
                                            .subscribe(function (res) { return _this.fillInfo(res.body); });
                                    }
                                });
                            }
                        }
                    }
                };
                SearchComponent.prototype.fillInfo = function (cake) {
                    this.dataString = "";
                    // translate JSON data into desired string format
                    this.dataString += cake.title + "\n\n";
                    if (cake.readyInMinutes) {
                        this.dataString += "(ready in " + cake.readyInMinutes + " minutes)";
                    }
                    else {
                        this.dataString += "none";
                    }
                    this.dataString += "\n\n";
                    // compile ingredient list
                    for (var ingrIndex in cake.extendedIngredients) {
                        this.dataString +=
                            cake.extendedIngredients[ingrIndex]["originalString"] +
                                "\n";
                    }
                    this.dataString += "\n";
                    // compile step list
                    if (cake.instructions) {
                        // create a temporary element to extract instructions
                        var divEl = document.createElement("div");
                        divEl.innerHTML = cake.instructions;
                        var instructionList = divEl.firstChild.children[0].children;
                        for (var stepIndex in instructionList) {
                            if (instructionList[stepIndex].innerHTML) {
                                this.dataString +=
                                    instructionList[stepIndex].innerHTML +
                                        "\n";
                            }
                        }
                    }
                    document.querySelector("[data-toggle='modal']").click();
                };
                SearchComponent.prototype.prepareSubmit = function (event) {
                    if (this.isEmptyString(event["name"])) {
                        this.readySubmit = false;
                        this.currModel = null;
                    }
                    else {
                        this.readySubmit = true;
                        this.currModel = event;
                    }
                };
                SearchComponent.prototype.addCake = function () {
                    var _this = this;
                    if (this.isEmptyString(this.currModel.name) && this.readySubmit) {
                        this._service.addCake(JSON.stringify(this.currModel))
                            .subscribe(function (res) {
                            _this.currModel = null;
                            _this._router.navigate(["CakeDetails", { id: res._id }]);
                        });
                    }
                };
                /********************
                 * Helper Functions *
                 ********************/
                SearchComponent.prototype.isEmptyString = function (str) {
                    return str == "" || str == null;
                };
                SearchComponent.prototype.goHome = function () {
                    this._router.navigate(["Home"]);
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        templateUrl: "templates/search.component.html",
                        directives: [import_cake_form_component_1.ImportCakeFormComponent]
                    }),
                    router_1.CanActivate(function () { return localStorage.getItem("id_token"); }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, cake_service_1.CakeService])
                ], SearchComponent);
                return SearchComponent;
            })();
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
//# sourceMappingURL=search.component.js.map