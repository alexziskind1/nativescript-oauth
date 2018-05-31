/// <reference path="references.d.ts" />

import { WebView } from 'ui/web-view';
import { isAndroid } from 'tns-core-modules/platform'

export class TnsOauthWebView extends WebView {
    constructor(
        private _cancelEventHandler: (error?) => void
    ) {
        super();
    }

    public onLoaded() {
        super.onLoaded();
        if (isAndroid) {
            this.android.getSettings().setBuiltInZoomControls(false);
        }
    }

    public onUnloaded() {
        super.onUnloaded();
        this._cancelEventHandler("User cancelled.");
    }
}
