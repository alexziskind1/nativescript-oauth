/// <reference path="references.d.ts" />

import { WebView } from 'ui/web-view';
import { isAndroid } from 'tns-core-modules/platform';


export class TnsOauthWebView extends WebView {
    public onLoaded() {
        super.onLoaded();
        if (isAndroid) {
            this.android.getSettings().setBuiltInZoomControls(false);
        }
    }
}