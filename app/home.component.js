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
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent() {
                }
                HomeComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div class=\"home-container\">\n            <h1 class=\"welcome-poster\">Welcome to Cake Book!</h1>\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <!--<h2>Welcome to Cake Book!</h2>-->\n            <img src=\"https://trello-attachments.s3.amazonaws.com/5615b20e9c16c07464530290/1001x563/7532ac9b9bd6cd632980e2b7c610b941/921d4acd-26ab-43c8-b056-11a6abdb7c28.jpg\">\n        </div>\n        "
                    }), 
                    __metadata('design:paramtypes', [])
                ], HomeComponent);
                return HomeComponent;
            })();
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map