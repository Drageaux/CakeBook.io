System.register([], function(exports_1) {
    var Cake;
    return {
        setters:[],
        execute: function() {
            Cake = (function () {
                function Cake(_id, user, name, image, croppedImage, description, ingredients, steps) {
                    this._id = _id;
                    this.user = user;
                    this.name = name;
                    this.image = image;
                    this.croppedImage = croppedImage;
                    this.description = description;
                    this.ingredients = ingredients;
                    this.steps = steps;
                }
                return Cake;
            })();
            exports_1("Cake", Cake);
        }
    }
});
//# sourceMappingURL=cake.js.map