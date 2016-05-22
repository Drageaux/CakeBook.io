var User = (function () {
    function User(_id, userId, userUrl, email, nickname, name, firstName, lastName, image) {
        this._id = _id;
        this.userId = userId;
        this.userUrl = userUrl;
        this.email = email;
        this.nickname = nickname;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
    }
    return User;
})();
exports.User = User;
//# sourceMappingURL=user.js.map