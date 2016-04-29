System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var TransitionService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TransitionService = (function () {
                function TransitionService() {
                    this.userId = JSON.parse(localStorage.getItem("profile")).user_id;
                }
                TransitionService.prototype.fadeToggleItem = function (item) {
                    jQuery(item).transition("fade");
                    this.timedCloseItem(item);
                };
                TransitionService.prototype.closeItem = function (item) {
                    jQuery(item).transition("fade");
                };
                TransitionService.prototype.timedCloseItem = function (item) {
                    window.setTimeout(function () {
                        jQuery(item).transition("fade");
                    }, 4000);
                };
                TransitionService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TransitionService);
                return TransitionService;
            })();
            exports_1("TransitionService", TransitionService);
        }
    }
});
//# sourceMappingURL=transition.service.js.map