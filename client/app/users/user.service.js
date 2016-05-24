var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.userProfile = {};
        this.userProfile = this.getLocalProfile();
    }
    UserService.prototype.isLoggedIn = function () {
        return localStorage.getItem("id_token") != null;
    };
    UserService.prototype.getLocalProfile = function () {
        return JSON.parse(localStorage.getItem("profile"));
    };
    UserService.prototype.getUser = function (id) {
        var decodedId = decodeURIComponent(id);
        return this.http.get("/api/user/" + decodedId)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.addUser = function () {
        if (this.userProfile == null) {
            return;
        }
        var body = JSON.stringify({
            "userId": this.userProfile.user_id,
            "nickname": this.userProfile.nickname,
            "email": this.userProfile.email,
            "name": this.userProfile.name,
            "firstName": this.userProfile.given_name,
            "lastName": this.userProfile.family_name
        });
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post("/api/user/" + this.userProfile.user_id, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.updateImportantDetails = function () {
        if (this.userProfile == null) {
            return;
        }
        var body = JSON.stringify({
            "userId": this.userProfile.user_id,
            "email": this.userProfile.email,
            "nickname": this.userProfile.nickname
        });
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put("/api/user/" + this.userProfile.user_id, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /********************
     * Helper Functions *
     ********************/
    UserService.prototype.isUrl = function (input) {
        var regex = new RegExp('^(ftp|http|https):\/\/[^ "]+$');
        return input.match(regex) != null;
    };
    UserService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable_1.Observable.throw(error || 'Server error');
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
})();
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map