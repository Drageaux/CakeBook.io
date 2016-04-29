import {Injectable} from 'angular2/core';

declare var jQuery;

@Injectable()
export class TransitionService {
    userId = JSON.parse(localStorage.getItem("profile")).user_id;

    fadeToggleItem(item:any) {
        jQuery(item).transition("fade");
        this.timedCloseItem(item);
    }

    closeItem(item:any) {
        jQuery(item).transition("fade");
    }

    timedCloseItem(item:any) {
        window.setTimeout(function () {
            jQuery(item).transition("fade");
        }, 4000);
    }
}
