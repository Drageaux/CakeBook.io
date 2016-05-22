import { bootstrap }        from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import "rxjs/Rx";
import {Http} from "@angular/http";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {provide} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";


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
