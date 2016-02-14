System.register([], function(exports_1) {
    "use strict";
    var Cake;
    return {
        setters:[],
        execute: function() {
            Cake = (function () {
                function Cake(id, name, ingredients, steps) {
                    this.id = id;
                    this.name = name;
                    this.ingredients = ingredients;
                    this.steps = steps;
                }
                return Cake;
            }());
            exports_1("Cake", Cake);
        }
    }
});
//# sourceMappingURL=cake.js.map