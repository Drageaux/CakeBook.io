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
                    this.results = {};
                    this.query = this._routeParams.get('query');
                }
                SearchComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log(this.query);
                    this._service.searchCakes(this.query, this._routeParams.get(("start")), this._routeParams.get("end"))
                        .subscribe(function (res) {
                        _this.results = res.body;
                        console.log(res.body);
                    });
                    //this.results = {
                    //    "results": [
                    //        {
                    //            "id": 130666,
                    //            "title": "Toll House Cake (Layer Cake or Bundt Cake- You Pick)",
                    //            "readyInMinutes": 45,
                    //            "image": "toll-house-cake-2-130666.jpg",
                    //            "imageUrls": [
                    //                "toll-house-cake-2-130666.jpg"
                    //            ]
                    //        },
                    //        {
                    //            "id": 579989,
                    //            "title": "Eggless Wheat Tutti Frutti Cake - Vegan Whole Wheat Cake - Christmas Cake s",
                    //            "readyInMinutes": 45,
                    //            "image": "Eggless-Wheat-Tutti-Frutti-Cake---Vegan-Whole-Wheat-Cake---Christmas-Cake-s-579989.jpg",
                    //            "imageUrls": [
                    //                "Eggless-Wheat-Tutti-Frutti-Cake---Vegan-Whole-Wheat-Cake---Christmas-Cake-s-579989.jpg"
                    //            ]
                    //        },
                    //        {
                    //            "id": 605095,
                    //            "title": "Eggless Mango Tutti Frutti Cake - Vegan Mango Wheat Cake - Eggless Cake s",
                    //            "readyInMinutes": 50,
                    //            "image": "Eggless-Mango-Tutti-Frutti-Cake---Vegan-Mango-Wheat-Cake---Eggless-Cake-s-605095.jpg",
                    //            "imageUrls": [
                    //                "Eggless-Mango-Tutti-Frutti-Cake---Vegan-Mango-Wheat-Cake---Eggless-Cake-s-605095.jpg"
                    //            ]
                    //        },
                    //        {
                    //            "id": 259569,
                    //            "title": "Oreo Mousse Filled Chocolate Trifecta Cake Using Cake Boss Mix",
                    //            "readyInMinutes": 32,
                    //            "image": "Oreo-Mousse-Filled-Chocolate-Trifecta-Cake-Using-Cake-Boss-Mix-259569.jpg",
                    //            "imageUrls": [
                    //                "Oreo-Mousse-Filled-Chocolate-Trifecta-Cake-Using-Cake-Boss-Mix-259569.jpg"
                    //            ]
                    //        },
                    //        {
                    //            "id": 600921,
                    //            "title": "Spiced Apple Cake – this is a wonderful cake to make in the fall, or anytime you have apples around",
                    //            "readyInMinutes": 70,
                    //            "image": "Spiced-Apple-Cake--this-is-a-wonderful-cake-to-make-in-the-fall--or-anytime-you-have-apples-around-600921.jpg",
                    //            "imageUrls": [
                    //                "Spiced-Apple-Cake--this-is-a-wonderful-cake-to-make-in-the-fall--or-anytime-you-have-apples-around-600921.jpg"
                    //            ]
                    //        },
                    //        {
                    //            "id": 130942,
                    //            "title": "Twelfth Night Cake or King Cake(Galette Des Rois)",
                    //            "readyInMinutes": 50,
                    //            "image": "twelfth-night-cake-or-king-cake-2-130942.jpg",
                    //            "imageUrls": [
                    //                "twelfth-night-cake-or-king-cake-2-130942.jpg",
                    //                "twelfth_night_cake_or_king_cake-130942.jpg"
                    //            ]
                    //        },
                    //        {
                    //            "id": 542505,
                    //            "title": "Confession #107: I’m a Lousy Cake Froster… Chocolate Rose Cake",
                    //            "readyInMinutes": 35,
                    //            "image": "Confession--107--Im-a-Lousy-Cake-Froster-Chocolate-Rose-Cake-542505.jpg",
                    //            "imageUrls": [
                    //                "Confession--107--Im-a-Lousy-Cake-Froster-Chocolate-Rose-Cake-542505.jpg"
                    //            ]
                    //        },
                    //        {
                    //            "id": 547965,
                    //            "title": "Funfetti Cake Batter White Chocolate Chip Cookie Cake",
                    //            "readyInMinutes": 45,
                    //            "image": "Funfetti-Cake-Batter-White-Chocolate-Chip-Cookie-Cake-547965.png",
                    //            "imageUrls": [
                    //                "Funfetti-Cake-Batter-White-Chocolate-Chip-Cookie-Cake-547965.png"
                    //            ]
                    //        },
                    //        {
                    //            "id": 612048,
                    //            "title": "Carrot Cake Poke Cake with Salted Caramel Cinnamon Glaze",
                    //            "readyInMinutes": 53,
                    //            "image": "Carrot-Cake-Poke-Cake-with-Salted-Caramel-Cinnamon-Glaze-612048.jpg",
                    //            "imageUrls": [
                    //                "Carrot-Cake-Poke-Cake-with-Salted-Caramel-Cinnamon-Glaze-612048.jpg"
                    //            ]
                    //        },
                    //        {
                    //            "id": 665941,
                    //            "title": "Carrot Cake Sheet Cake with Pineapple Cream Cheese Frosting",
                    //            "readyInMinutes": 60,
                    //            "image": "Carrot-Cake-Sheet-Cake-with-Pineapple-Cream-Cheese-Frosting-665941.jpg",
                    //            "imageUrls": [
                    //                "Carrot-Cake-Sheet-Cake-with-Pineapple-Cream-Cheese-Frosting-665941.jpg"
                    //            ]
                    //        }
                    //    ],
                    //    "baseUri": "https://spoonacular.com/recipeImages/",
                    //    "offset": 0,
                    //    "number": 10,
                    //    "totalResults": 10,
                    //    "processingTimeMs": 252,
                    //    "expires": 1460907924132,
                    //    "isStale": false
                    //}
                };
                SearchComponent.prototype.goSearch = function (query, start, end) {
                    if (query != "" && query != null) {
                        this._router.navigate(["Search", {
                                query: query,
                                start: start,
                                end: end
                            }]);
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