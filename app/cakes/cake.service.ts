import {Injectable} from 'angular2/core';
import {CAKES} from "./mock-cakes";

@Injectable()
export class CakeService {
    getCakes() {
        return cakesPromise;
    }

    getCake(id:number | String) {
        return cakesPromise.then(cakes => cakes.filter(c => c.id === +id)[0]);
    }
}

var cakesPromise = Promise.resolve(CAKES);