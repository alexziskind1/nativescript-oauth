import { on, resumeEvent, suspendEvent } from 'tns-core-modules/application';

export function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


export function nsArrayToJSArray(a) {
    var arr = [];
    if ("undefined" !== typeof a) {
        var count = a.count;
        for (var i = 0; i < count; i++) {
            arr.push(a.objectAtIndex(i));
        }
    }
    return arr;
}

export function newUUID(a?,b?){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b}

let appSuspending = false;
on(suspendEvent, () => { appSuspending = true; });
on(resumeEvent, () => { appSuspending = false; });

export function isAppSuspending(): boolean {
    return appSuspending;
}
