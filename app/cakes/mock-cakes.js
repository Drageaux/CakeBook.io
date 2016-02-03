System.register(["../cake"], function(exports_1) {
    var cake_1;
    var CAKES;
    return {
        setters:[
            function (cake_1_1) {
                cake_1 = cake_1_1;
            }],
        execute: function() {
            exports_1("CAKES", CAKES = [
                new cake_1.Cake(1, "Slow Cooker Chocolate Lava Cake", [], []),
                new cake_1.Cake(2, "S’mores Pizza Roll-Up", [], []),
                new cake_1.Cake(3, "S'mores Dip", [], []),
                new cake_1.Cake(4, "Easy No-Bake Chocolate-Ricotta Cake", [
                    "combine 2 parts melted semi sweet chocolate with 3 parts ricotta cheese",
                    "layer with chocolate graham crackers until your selected dish is full",
                    "refrigerate at least 8 hours, up to 48"
                ], [
                    "8 oz semi sweet chocolate",
                    "chocolate graham crackers",
                    "12 oz ricotta cheese",
                ]),
                new cake_1.Cake(5, "Chocolate Mousse", [], [])
            ]);
        }
    }
});
//# sourceMappingURL=mock-cakes.js.map