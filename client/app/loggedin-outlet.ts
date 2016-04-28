/**
 * Code from Auth0's Angular 2 Authentication on GitHub
 * https://github.com/auth0/angular2-authentication-sample/tree/master/src
 **/

import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction, CanActivate} from 'angular2/router';
import {tokenNotExpired} from "angular2-jwt";
import {ViewContainerRef} from "angular2/core";

@Directive({
    selector: 'loggedin-router-outlet'
})

@CanActivate(() => tokenNotExpired())
export class LoggedInRouterOutlet extends RouterOutlet {
    publicRoutes: any;
    private parentRouter: Router;

    constructor(_viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader,
                _parentRouter: Router, @Attribute('name') nameAttr: string) {
        super(_viewContainerRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/login': true
        };
    }

    activate(instruction: ComponentInstruction) {
        var url = this.parentRouter.lastNavigationAttempt;
        if (!this.publicRoutes[url] && !localStorage.getItem('id_token')) {
            // todo: redirect to Login, may be there a better way?
            this.parentRouter.navigateByUrl('/login');
        }
        return super.activate(instruction);
    }
}