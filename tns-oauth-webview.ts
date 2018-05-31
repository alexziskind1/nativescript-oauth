/// <reference path="references.d.ts" />

import { WebView } from 'ui/web-view';
import { android } from 'tns-core-modules/application';
import { isAndroid } from 'tns-core-modules/platform'

// https://developer.android.com/reference/android/view/WindowManager.LayoutParams#soft_input_adjust_resize
const SOFT_INPUT_ADJUST_RESIZE = 16;

export class TnsOauthWebView extends WebView {
    private originalSoftInputMode: number;

    constructor(
        private _cancelEventHandler: (error?) => void
    ) {
        super();
    }

    public onLoaded() {
        super.onLoaded();
        if (isAndroid) {
            this.android.getSettings().setBuiltInZoomControls(false);
            this.setAndroidSoftInputModeToResize();
        }
    }

    public onUnloaded() {
        super.onUnloaded();
        this._cancelEventHandler("User cancelled.");
        if (isAndroid) {
            this.restoreAndroidSoftInputMode();
        }
    }

    private setAndroidSoftInputModeToResize(): void {
        const window = android.foregroundActivity.getWindow();
        this.originalSoftInputMode = window.getAttributes().softInputMode;
        window.setSoftInputMode(SOFT_INPUT_ADJUST_RESIZE);
    }

    private restoreAndroidSoftInputMode(): void {
        const window = android.foregroundActivity.getWindow();
        window.setSoftInputMode(this.originalSoftInputMode);
    }
}
