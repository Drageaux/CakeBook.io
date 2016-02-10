import {Component} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
declare var Auth0Lock;

@Component({

})

export class LoginComponent {
    //lock = new Auth0Lock("'1w9uIYPLBxZzbciPImlhyG39EPDqzv8e', 'drageaux.auth0.com'");
    //
    //constructor() {}
    //
    //login() {
    //    this.lock.show(function(err:string, profile:string, id_token:string) {
    //
    //        if(err) {
    //            throw new Error(err);
    //        }
    //
    //        localStorage.setItem('profile', JSON.stringify(profile));
    //        localStorage.setItem('id_token', id_token);
    //
    //    });
    //}
    //
    //logout() {
    //    localStorage.removeItem('profile');
    //    localStorage.removeItem('id_token');
    //}
    //
    //loggedIn() {
    //    return tokenNotExpired();
    //}

}