import {Injectable} from 'angular2/core';

declare var jQuery;

@Injectable()
export class TransitionService {
    userId = JSON.parse(localStorage.getItem("profile")).user_id;

    fadeToggleItem(item:any) {
        jQuery(item).transition("fade");
        window.setTimeout(function () {
            // TODO Temporary duplicate code until there's a better way to close
            if (!jQuery(item).hasClass("hidden")) {
                jQuery(item).transition("fade");
            }
        }, 4000);
    }

    closeItem(item:any) {
        if (!jQuery(item).hasClass("hidden")) {
            jQuery(item).transition("fade");
        }
    }
}
