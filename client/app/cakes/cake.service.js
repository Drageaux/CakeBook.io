System.register(['angular2/core', "rxjs/Observable", "angular2/http"], function(exports_1) {
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
    var CakeService;
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
            CakeService = (function () {
                function CakeService(http) {
                    this.http = http;
                    this.userId = JSON.parse(localStorage.getItem("profile")).user_id;
                }
                CakeService.prototype.getCakes = function () {
                    return this.http.get("/api/" + this.userId + "/cakes")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                CakeService.prototype.getCake = function (id) {
                    return this.http.get("/api/" + this.userId + "/cake/" + id)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                CakeService.prototype.addCake = function (cake) {
                    var body = cake;
                    var headers = new http_1.Headers({ "Content-Type": "application/json" });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post("/api/" + this.userId + "/cakes", body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                CakeService.prototype.deleteCake = function (id) {
                    return this.http.delete("/api/" + this.userId + "/cake/" + id)
                        .catch(this.handleError);
                };
                CakeService.prototype.addCakeDetail = function (id, detailType, detailName) {
                    var body = JSON.stringify({ type: detailType, name: detailName });
                    var headers = new http_1.Headers({ "Content-Type": "application/json" });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post("/api/" + this.userId + "/cake/" + id + "/detail", body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                CakeService.prototype.getCakeImage = function (id) {
                    return this.http.get("/api/" + this.userId + "/cake/" + id + "/image")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                CakeService.prototype.uploadCakeImage = function (id) {
                    return this.http.get("/api/" + this.userId + "/cake/" + id + "/upload")
                        .map(function (res) { return console.log(res); })
                        .catch(this.handleError);
                };
                CakeService.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                CakeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], CakeService);
                return CakeService;
            })();
            exports_1("CakeService", CakeService);
        }
    }
});
//# sourceMappingURL=cake.service.js.map