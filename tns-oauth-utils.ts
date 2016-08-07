

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