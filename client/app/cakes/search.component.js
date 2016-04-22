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
                }
                SearchComponent.prototype.ngOnInit = function () {
                    //if (this._service.isUrl(this.query)) {
                    //    let encodedQuery = encodeURIComponent(this.query);
                    //    this._service.extractCake(encodedQuery)
                    //        .subscribe(res => {
                    //            this.results = {"results": []};
                    //            this.results["results"].push(res.body);
                    //            console.log(this.results);
                    //        });
                    //} else {
                    //    this._service.searchCakes(
                    //        this.query,
                    //        this._routeParams.get(("start")),
                    //        this._routeParams.get("end"))
                    //        .subscribe(res => {
                    //            this.results = res.body;
                    //            console.log(this.results);
                    //        });
                    //}
                    this.results = { "results": [] };
                    this.results.results.push({
                        "vegetarian": false,
                        "vegan": false,
                        "glutenFree": false,
                        "dairyFree": false,
                        "veryHealthy": false,
                        "cheap": false,
                        "veryPopular": true,
                        "sustainable": false,
                        "weightWatcherSmartPoints": 44,
                        "gaps": "no",
                        "lowFodmap": false,
                        "ketogenic": false,
                        "whole30": false,
                        "servings": 2,
                        "preparationMinutes": 20,
                        "cookingMinutes": 12,
                        "sourceUrl": "http://allrecipes.com/recipe/222186/pizza-with-ham-asparagus-and-ricotta/",
                        "spoonacularSourceUrl": "https://spoonacular.com/pizza-with-ham-asparagus-and-ricotta-734559",
                        "aggregateLikes": 429,
                        "extendedIngredients": [
                            {
                                "aisle": "Produce",
                                "name": "asparagus",
                                "amount": 1,
                                "unit": "cup",
                                "unitShort": "c",
                                "unitLong": "cup",
                                "originalString": "1 cup fresh asparagus, trimmed",
                                "metaInformation": []
                            },
                            {
                                "aisle": "Cheese",
                                "name": "ricotta cheese",
                                "amount": 0.5,
                                "unit": "cup",
                                "unitShort": "c",
                                "unitLong": "cups",
                                "originalString": "1/2 cup ricotta cheese",
                                "metaInformation": []
                            },
                            {
                                "aisle": "Oil, Vinegar, Salad Dressing",
                                "name": "olive oil",
                                "amount": 0.25,
                                "unit": "cup",
                                "unitShort": "c",
                                "unitLong": "cups",
                                "originalString": "1/4 cup olive oil",
                                "metaInformation": []
                            },
                            {
                                "aisle": "Produce",
                                "name": "garlic",
                                "amount": 2,
                                "unit": "cloves",
                                "unitShort": "cloves",
                                "unitLong": "cloves",
                                "originalString": "2 cloves garlic, minced",
                                "metaInformation": []
                            },
                            {
                                "aisle": "Spices and Seasonings",
                                "name": "red pepper flakes",
                                "amount": 1,
                                "unit": "pinch",
                                "unitShort": "pinch",
                                "unitLong": "pinch",
                                "originalString": "1 pinch red pepper flakes, or to taste",
                                "metaInformation": []
                            },
                            {
                                "aisle": "Spices and Seasonings",
                                "name": "salt and pepper",
                                "amount": 1,
                                "unit": "serving",
                                "unitShort": "serving",
                                "unitLong": "serving",
                                "originalString": "salt and freshly ground black pepper to taste",
                                "metaInformation": []
                            },
                            {
                                "aisle": "Milk, Eggs, Other Dairy",
                                "name": "heavy cream",
                                "amount": 2,
                                "unit": "tablespoons",
                                "unitShort": "T",
                                "unitLong": "tablespoons",
                                "originalString": "2 tablespoons heavy cream",
                                "metaInformation": []
                            },
                            {
                                "aisle": "Produce",
                                "name": "herbs",
                                "amount": 2,
                                "unit": "tablespoons",
                                "unitShort": "T",
                                "unitLong": "tablespoons",
                                "originalString": "2 tablespoons chopped herbs, such as basil, parsley, rosemary, thyme (optional)",
                                "metaInformation": []
                            },
                            {
                                "aisle": "Refrigerated",
                                "name": "pizza dough",
                                "amount": 1,
                                "unit": "pound",
                                "unitShort": "lb",
                                "unitLong": "pound",
                                "originalString": "1 pound pizza dough (see footnote for recipe link)",
                                "metaInformation": []
                            },
                            {
                                "aisle": "Meat",
                                "name": "ham",
                                "amount": 0.5,
                                "unit": "cup",
                                "unitShort": "c",
                                "unitLong": "cups",
                                "originalString": "1/2 cup diced smoked ham",
                                "metaInformation": []
                            },
                            {
                                "aisle": "Cheese",
                                "name": "white sharp cheddar cheese",
                                "amount": 0.5,
                                "unit": "cup",
                                "unitShort": "c",
                                "unitLong": "cups",
                                "originalString": "1/2 cup shredded sharp white Cheddar cheese",
                                "metaInformation": []
                            },
                            {
                                "aisle": "Cheese",
                                "name": "parmigiano reggiano cheese",
                                "amount": 1,
                                "unit": "tablespoon",
                                "unitShort": "T",
                                "unitLong": "tablespoon",
                                "originalString": "1 tablespoon finely grated Parmigiano-Reggiano cheese",
                                "metaInformation": []
                            }
                        ],
                        "id": 734559,
                        "title": "Pizza with Ham, Asparagus, and Ricotta",
                        "readyInMinutes": 37,
                        "image": "pizza-with-ham-asparagus-and-ricotta-734559.jpg",
                        "imageUrls": [
                            "pizza-with-ham-asparagus-and-ricotta-734559.jpg"
                        ],
                        "text": "Preheat an oven to 550 degrees F (285 degrees C).                        Bring a large pot of lightly salted water to a boil. Add asparagus and cook uncovered until just tender, about 2 minutes. Drain in a colander, then immediately immerse in ice water for several minutes. Once asparagus is cold, drain well and set aside.                        Combine ricotta, olive oil, garlic, red pepper flakes, salt, black pepper, and heavy cream in a small bowl. Stir in fresh herbs (if using) and set aside.                        To shape the pizza dough, sprinkle the countertop and dough surface with flour and lightly pat flat. Use a rolling pin to form a thin disk about 9 inches in diameter. Transfer to a baking sheet.                        Spread ricotta mixture over crust, top with ham and asparagus. Sprinkle with Cheddar and Parmigiano-Reggiano cheeses.                        Place baking sheet on the bottom rack of the preheated oven and bake for 5 minutes. Transfer the baking sheet to the top rack and bake for an additional 5 minutes.",
                        "instructions": "<div class=\"recipeInstructions\" itemprop=\"recipeInstructions\">\n<ol>\n<li>Preheat an oven to 550 degrees F (285 degrees C).</li>\n<li>Bring a large pot of lightly salted water to a boil. </li>\n<li>Add asparagus and cook uncovered until just tender, about 2 minutes. </li>\n<li>Drain in a colander, then immediately immerse in ice water for several minutes. Once asparagus is cold, drain well and set aside.</li>\n\n<li>Combine ricotta, olive oil, garlic, red pepper flakes, salt, black pepper, and heavy cream in a small bowl. Stir in fresh herbs (if using) and set aside.</li>\n<li>To shape the pizza dough, sprinkle the countertop and dough surface with flour and lightly pat flat. Use a rolling pin to form a thin disk about 9 inches in diameter. </li>\n<li>Transfer to a baking sheet.</li>\n\n<li>Spread ricotta mixture over crust, top with ham and asparagus. Sprinkle with Cheddar and Parmigiano-Reggiano cheeses.</li>\n\n<li>Place baking sheet on the bottom rack of the preheated oven and bake for 5 minutes. </li>\n<li>Transfer the baking sheet to the top rack and bake for an additional 5 minutes.</li>\n</ol>\n</div>"
                    });
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
                    this.dataString = "";
                    for (var i in this.results.results) {
                        if (this.results.results[i]["id"] == id) {
                            var cake = this.results.results[i];
                            // translate JSON data into desired string format
                            this.dataString += cake.title + "\n\n";
                            this.dataString += "(ready in " + cake.readyInMinutes + " minutes)\n\n";
                            // compile ingredient list
                            for (var ingrIndex in cake.extendedIngredients) {
                                this.dataString +=
                                    cake.extendedIngredients[ingrIndex]["originalString"] +
                                        "\n";
                            }
                            this.dataString += "\n";
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
                            document.querySelector("[data-toggle='modal']").click();
                        }
                    }
                };
                SearchComponent.prototype.prepareSubmit = function (event) {
                    this.readySubmit = true;
                    this.currModel = event;
                };
                SearchComponent.prototype.addCake = function () {
                    var _this = this;
                    if (this.currModel != null && this.readySubmit) {
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