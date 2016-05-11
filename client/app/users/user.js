System.register([], function(exports_1) {
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(_id, userId, name, firstName, lastName, image, croppedImage) {
                    this._id = _id;
                    this.userId = userId;
                    this.name = name;
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.image = image;
                    this.croppedImage = croppedImage;
                }
                return User;
            })();
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map