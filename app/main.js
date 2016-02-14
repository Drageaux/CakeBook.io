System.register(["angular2/platform/browser", "./app.component", "angular2/router", "rxjs/Rx", "angular2/http", "angular2-jwt", "angular2/core"], function(exports_1) {
    "use strict";
    var browser_1, app_component_1, router_1, http_1, angular2_jwt_1, core_1, http_2;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {},
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [
                router_1.ROUTER_PROVIDERS,
                http_2.HTTP_PROVIDERS,
                core_1.provide(angular2_jwt_1.AuthHttp, {
                    useFactory: function (http) {
                        return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig(), http);
                    },
                    deps: [http_1.Http]
                })
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map