var Cake = (function () {
    function Cake(_id, isPublic, isFavorite, user, name, image, croppedImage, description, ingredients, steps) {
        this._id = _id;
        this.isPublic = isPublic;
        this.isFavorite = isFavorite;
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
exports.Cake = Cake;
//# sourceMappingURL=cake.js.map