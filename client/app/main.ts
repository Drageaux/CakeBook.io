import {provide} from "@angular/core";
import {bootstrap}        from '@angular/platform-browser-dynamic';
import "rxjs/Rx";
import { ROUTER_PROVIDERS } from '@angular/router';
import {Http,HTTP_PROVIDERS} from "@angular/http";
import {AuthConfig, AuthHttp} from "angular2-jwt";

import {AppComponent} from "./app.component";
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
