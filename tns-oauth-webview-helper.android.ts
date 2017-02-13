/// <reference path="references.d.ts" />

import { WebView } from 'ui/web-view';
import trace = require("trace");

export class TnsOAuthWebViewHelper extends android.webkit.WebViewClient {

    private _view: any;
    private _origClient: any; //WebViewClient
    private _checkCodeIntercept: (WebView, error?, url?) => boolean;

    constructor() {
        super();
        return global.__native(this);
    }

    public static initWithWebViewAndIntercept(wv: WebView, checkCodeIntercept) {
        (<any>wv)._webViewClient = TnsOAuthWebViewHelper.initWithView(wv, checkCodeIntercept);
    }

    private static initWithView(view: WebView, checkCodeIntercept): TnsOAuthWebViewHelper {
        try {
            let client = new TnsOAuthWebViewHelper();
            client._view = view;
            client._origClient = (<any>view)._webViewClient;
            client._checkCodeIntercept = checkCodeIntercept;
            return client;
        }
        catch (er) {
            console.dir(er);
        }
    }

    public shouldOverrideUrlLoading(view: android.webkit.WebView, url: string) {
        if (trace.enabled) {
            trace.write("WebViewClientClass.shouldOverrideUrlLoading(" + url + ")", trace.categories.Debug);
        }
        if (this._checkCodeIntercept(this._view, null, url)) {
            return true;
        }
        return false;
    }

    public onPageStarted(view: android.webkit.WebView, url: string, favicon: android.graphics.Bitmap) {
        this._checkCodeIntercept(this._view, null, url);

        super.onPageStarted(view, url, favicon);

        if (this._view) {
            if (trace.enabled) {
                trace.write("WebViewClientClass.onPageStarted(" + url + ", " + favicon + ")", trace.categories.Debug);
            }
            this._view._onLoadStarted(url, WebView.navigationTypes[WebView.navigationTypes.indexOf("linkClicked")]);
        }

    }

    public onPageFinished(view: android.webkit.WebView, url: string) {
        super.onPageFinished(view, url);

        if (this._view) {
            if (trace.enabled) {
                trace.write("WebViewClientClass.onPageFinished(" + url + ")", trace.categories.Debug);
            }

            this._checkCodeIntercept(this._view, null, url);
            this._view._onLoadFinished(url, undefined);
        }
    }

    public onReceivedError() {
        var view: android.webkit.WebView = arguments[0];
        if (arguments.length === 4) {

            var errorCode: number = arguments[1];
            var description: string = arguments[2];
            var failingUrl: string = arguments[3];
            this._checkCodeIntercept(this._view, null, failingUrl)

            super.onReceivedError(view, errorCode, description, failingUrl);

            if (this._view) {
                if (trace.enabled) {
                    trace.write("WebViewClientClass.onReceivedError(" + errorCode + ", " + description + ", " + failingUrl + ")", trace.categories.Debug);
                }
                this._view._onLoadFinished(failingUrl, description + "(" + errorCode + ")");
            }
        } else {

            var request: any = arguments[1];
            var error: any = arguments[2];
            this._checkCodeIntercept(this._view, error)

            super.onReceivedError(view, request, error);

            if (this._view) {
                if (trace.enabled) {
                    trace.write("WebViewClientClass.onReceivedError(" + error.getErrorCode() + ", " + error.getDescription() + ", " + (error.getUrl && error.getUrl()) + ")", trace.categories.Debug);
                }
                this._view._onLoadFinished(error.getUrl && error.getUrl(), error.getDescription() + "(" + error.getErrorCode() + ")");
            }

        }
    }

}
