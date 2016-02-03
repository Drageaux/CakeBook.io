System.register(['angular2/core', "./mock-cakes"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, mock_cakes_1;
    var CakeService, cakesPromise;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mock_cakes_1_1) {
                mock_cakes_1 = mock_cakes_1_1;
            }],
        execute: function() {
            CakeService = (function () {
                function CakeService() {
                }
                CakeService.prototype.getCakes = function () {
                    return cakesPromise;
                };
                CakeService.prototype.getCake = function (id) {
                    return cakesPromise.then(function (cakes) { return cakes.filter(function (c) { return c.id === +id; })[0]; });
                };
                CakeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CakeService);
                return CakeService;
            })();
            exports_1("CakeService", CakeService);
            cakesPromise = Promise.resolve(mock_cakes_1.CAKES);
        }
    }
});
//# sourceMappingURL=cake.service.js.map