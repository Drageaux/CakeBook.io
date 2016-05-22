var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_1 = require('@angular/router');
require("rxjs/Rx");
var http_1 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
var core_1 = require("@angular/core");
var http_2 = require("@angular/http");
var app_component_1 = require("./app.component");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    router_1.ROUTER_PROVIDERS,
    http_2.HTTP_PROVIDERS,
    core_1.provide(angular2_jwt_1.AuthHttp, {
        useFactory: function (http) {
            return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig(), http);
        },
        deps: [http_1.Http]
    })
]);
//# sourceMappingURL=main.js.map