import {bootstrap}    from "angular2/platform/browser";
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from "angular2/router";
import "rxjs/Rx";
import {Http} from "angular2/http";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";


bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
        },
        deps: [Http]
    })
]);
