System.register(["angular2/core", "angular2/router", "./cake.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, cake_service_1;
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
                }
                SearchComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log(encodeURI(this.query));
                    if (this._service.isUrl(this.query)) {
                        this._service.extractCake(encodeURI(this.query))
                            .subscribe(function (res) { return _this.results = res.body; });
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
                    // Get info to redirect and import the cake
                };
                SearchComponent.prototype.isEmptyString = function (str) {
                    return str == "" || str == null;
                };
                SearchComponent.prototype.goHome = function () {
                    this._router.navigate(["Home"]);
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        templateUrl: "templates/search.component.html"
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