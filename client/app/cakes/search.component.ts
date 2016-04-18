import {Component, OnInit} from "angular2/core";
import {Router, RouteParams, CanActivate} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";
import {Observable} from "rxjs/Observable";

import {CakeService} from "./cake.service";

@Component({
    templateUrl: "templates/search.component.html"
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
        //        res => {
        //            this.results = res.body;
        //            console.log(res.body)
        //        }
        //    );
        this.results = {
            "results": [
                {
                    "id": 130666,
                    "title": "Toll House Cake (Layer Cake or Bundt Cake- You Pick)",
                    "readyInMinutes": 45,
                    "image": "toll-house-cake-2-130666.jpg",
                    "imageUrls": [
                        "toll-house-cake-2-130666.jpg"
                    ]
                },
                {
                    "id": 579989,
                    "title": "Eggless Wheat Tutti Frutti Cake - Vegan Whole Wheat Cake - Christmas Cake s",
                    "readyInMinutes": 45,
                    "image": "Eggless-Wheat-Tutti-Frutti-Cake---Vegan-Whole-Wheat-Cake---Christmas-Cake-s-579989.jpg",
                    "imageUrls": [
                        "Eggless-Wheat-Tutti-Frutti-Cake---Vegan-Whole-Wheat-Cake---Christmas-Cake-s-579989.jpg"
                    ]
                },
                {
                    "id": 605095,
                    "title": "Eggless Mango Tutti Frutti Cake - Vegan Mango Wheat Cake - Eggless Cake s",
                    "readyInMinutes": 50,
                    "image": "Eggless-Mango-Tutti-Frutti-Cake---Vegan-Mango-Wheat-Cake---Eggless-Cake-s-605095.jpg",
                    "imageUrls": [
                        "Eggless-Mango-Tutti-Frutti-Cake---Vegan-Mango-Wheat-Cake---Eggless-Cake-s-605095.jpg"
                    ]
                },
                {
                    "id": 259569,
                    "title": "Oreo Mousse Filled Chocolate Trifecta Cake Using Cake Boss Mix",
                    "readyInMinutes": 32,
                    "image": "Oreo-Mousse-Filled-Chocolate-Trifecta-Cake-Using-Cake-Boss-Mix-259569.jpg",
                    "imageUrls": [
                        "Oreo-Mousse-Filled-Chocolate-Trifecta-Cake-Using-Cake-Boss-Mix-259569.jpg"
                    ]
                },
                {
                    "id": 600921,
                    "title": "Spiced Apple Cake – this is a wonderful cake to make in the fall, or anytime you have apples around",
                    "readyInMinutes": 70,
                    "image": "Spiced-Apple-Cake--this-is-a-wonderful-cake-to-make-in-the-fall--or-anytime-you-have-apples-around-600921.jpg",
                    "imageUrls": [
                        "Spiced-Apple-Cake--this-is-a-wonderful-cake-to-make-in-the-fall--or-anytime-you-have-apples-around-600921.jpg"
                    ]
                },
                {
                    "id": 130942,
                    "title": "Twelfth Night Cake or King Cake(Galette Des Rois)",
                    "readyInMinutes": 50,
                    "image": "twelfth-night-cake-or-king-cake-2-130942.jpg",
                    "imageUrls": [
                        "twelfth-night-cake-or-king-cake-2-130942.jpg",
                        "twelfth_night_cake_or_king_cake-130942.jpg"
                    ]
                },
                {
                    "id": 542505,
                    "title": "Confession #107: I’m a Lousy Cake Froster… Chocolate Rose Cake",
                    "readyInMinutes": 35,
                    "image": "Confession--107--Im-a-Lousy-Cake-Froster-Chocolate-Rose-Cake-542505.jpg",
                    "imageUrls": [
                        "Confession--107--Im-a-Lousy-Cake-Froster-Chocolate-Rose-Cake-542505.jpg"
                    ]
                },
                {
                    "id": 547965,
                    "title": "Funfetti Cake Batter White Chocolate Chip Cookie Cake",
                    "readyInMinutes": 45,
                    "image": "Funfetti-Cake-Batter-White-Chocolate-Chip-Cookie-Cake-547965.png",
                    "imageUrls": [
                        "Funfetti-Cake-Batter-White-Chocolate-Chip-Cookie-Cake-547965.png"
                    ]
                },
                {
                    "id": 612048,
                    "title": "Carrot Cake Poke Cake with Salted Caramel Cinnamon Glaze",
                    "readyInMinutes": 53,
                    "image": "Carrot-Cake-Poke-Cake-with-Salted-Caramel-Cinnamon-Glaze-612048.jpg",
                    "imageUrls": [
                        "Carrot-Cake-Poke-Cake-with-Salted-Caramel-Cinnamon-Glaze-612048.jpg"
                    ]
                },
                {
                    "id": 665941,
                    "title": "Carrot Cake Sheet Cake with Pineapple Cream Cheese Frosting",
                    "readyInMinutes": 60,
                    "image": "Carrot-Cake-Sheet-Cake-with-Pineapple-Cream-Cheese-Frosting-665941.jpg",
                    "imageUrls": [
                        "Carrot-Cake-Sheet-Cake-with-Pineapple-Cream-Cheese-Frosting-665941.jpg"
                    ]
                }
            ],
            "baseUri": "https://spoonacular.com/recipeImages/",
            "offset": 0,
            "number": 10,
            "totalResults": 10,
            "processingTimeMs": 252,
            "expires": 1460907924132,
            "isStale": false
        }
        console.log(this.results);
    }

    goSearch(query:string) {
        if (query != "" && query != null) {
            this._router.navigate(["Search", {query: query}]);
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