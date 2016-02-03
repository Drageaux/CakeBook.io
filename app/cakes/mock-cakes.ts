import {Cake} from "../cake";

export var CAKES: Cake[] = [
    new Cake(1, "Slow Cooker Chocolate Lava Cake", [], []),
    new Cake(2, "S’mores Pizza Roll-Up", [], []),
    new Cake(3, "S'mores Dip", [], []),
    new Cake(4, "Easy No-Bake Chocolate-Ricotta Cake",
        [
            "combine 2 parts melted semi sweet chocolate with 3 parts ricotta cheese",
            "layer with chocolate graham crackers until your selected dish is full",
            "refrigerate at least 8 hours, up to 48"
        ],
        [
            "8 oz semi sweet chocolate",
            "chocolate graham crackers",
            "12 oz ricotta cheese",
        ]),
    new Cake(5, "Chocolate Mousse", [], [])
]