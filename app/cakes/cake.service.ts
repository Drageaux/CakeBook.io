import {Injectable} from 'angular2/core';
import {CAKES} from "./mock-cakes";

@Injectable()
export class CakeService {
    getCakes() {
        return Promise.resolve(CAKES);
    }
}
