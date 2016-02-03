import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {HomeComponent}          from "./home.component";
import {ProfileComponent}       from "./profile.component";
import {CakeDetailComponent}    from "./cakes/cake-detail.component";
import {CakeService}            from "./cakes/cake.service";

// Need to be imported later on for some reason
import {ViewEncapsulation}        from "angular2/core";

@Component({
    selector: 'my-app',
    template: `
        <nav>
            <a [routerLink]="['Home']">Home</a> |
            <a [routerLink]="['Cakes']">Profile</a>
        </nav>
        <router-outlet></router-outlet>
		`,
    styleUrls: ["app/style.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [CakeService],
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: "/home", name: "Home", component: HomeComponent, useAsDefault: true},
    {path: "/cakes", name: "Cakes", component: ProfileComponent},
    {path: "/cake/:id", name: "CakeDetail", component: CakeDetailComponent}
])

export class AppComponent {
}

