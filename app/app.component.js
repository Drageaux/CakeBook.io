System.register(["angular2/core", "angular2/http", "angular2/router", 'a2-in-memory-web-api/core', "./home.component", "./profile.component", "./cakes/cake-data", "./cakes/cake-detail.component", "./cakes/cake.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, http_2, core_2, home_component_1, profile_component_1, cake_data_1, cake_detail_component_1, cake_service_1, core_3;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_3 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            },
            function (cake_data_1_1) {
                cake_data_1 = cake_data_1_1;
            },
            function (cake_detail_component_1_1) {
                cake_detail_component_1 = cake_detail_component_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <nav>\n            <a [routerLink]=\"['Home']\">Home</a> |\n            <a [routerLink]=\"['Cakes']\">Profile</a>\n        </nav>\n        <router-outlet></router-outlet>\n\t\t",
                        styleUrls: ["app/stylesheets/style.css"],
                        encapsulation: core_3.ViewEncapsulation.None,
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            cake_service_1.CakeService,
                            // in-memory web api providers
                            core_1.provide(http_2.XHRBackend, { useClass: core_2.InMemoryBackendService }),
                            core_1.provide(core_2.SEED_DATA, { useClass: cake_data_1.CakeData }) // in-mem server data
                        ],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: "/home", name: "Home", component: home_component_1.HomeComponent, useAsDefault: true },
                        { path: "/cakes", name: "Cakes", component: profile_component_1.ProfileComponent },
                        { path: "/cake/:id", name: "CakeDetail", component: cake_detail_component_1.CakeDetailComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map