System.register(["angular2/core", "rxjs/Observable", "angular2/http"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1, http_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http) {
                    this.http = http;
                    this.userId = JSON.parse(localStorage.getItem("profile")).user_id;
                }
                UserService.prototype.getUser = function () {
                    return this.http.get("/api/user/" + this.userId)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                UserService.prototype.addUser = function (user) {
                    var body = user;
                    var headers = new http_1.Headers({ "Content-Type": "application/json" });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post("/api/user/" + this.userId, body, options)
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
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map