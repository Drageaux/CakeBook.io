System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Cake;
    return {
        setters:[],
        execute: function() {
            Cake = (function () {
                function Cake(_id, name, ingredients, steps) {
                    this._id = _id;
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