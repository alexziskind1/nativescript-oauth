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
        let wvCreateNv = wv.createNativeView;
        wv.createNativeView = () => {
            (<any>wv)._webViewClient = TnsOAuthWebViewHelper.initWithView(wv, checkCodeIntercept);
            let nativeView = new android.webkit.WebView(wv._context);
            nativeView.getSettings().setJavaScriptEnabled(true);
            nativeView.getSettings().setBuiltInZoomControls(true);
            nativeView.setWebViewClient((<any>wv)._webViewClient);
            (<any>nativeView).client = (<any>wv)._webViewClient;
            return nativeView;
        };
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

    /// param url was a string before 7.1.1. It is an object after 7.1.1
    public shouldOverrideUrlLoading(view: android.webkit.WebView, url: any) {
        if (trace.isEnabled()) {
            trace.write("WebViewClientClass.shouldOverrideUrlLoading(" + url + ")", trace.categories.Debug);
        }
        var urlStr = '';
        if (typeof url === 'string') {
            urlStr = url;
        } else if (typeof url === 'object') {
            try {
                urlStr = url.getUrl().toString();
            }
            catch (ex) {
                return false;
            }
        } else {
            return false;
        }
        if (this._checkCodeIntercept(this._view, null, urlStr)) {
            return true;
        }
        return false;
    }

    public onPageStarted(view: android.webkit.WebView, url: string, favicon: android.graphics.Bitmap) {
        this._checkCodeIntercept(this._view, null, url);

        super.onPageStarted(view, url, favicon);

        if (this._view) {
            if (trace.isEnabled()) {
                trace.write("WebViewClientClass.onPageStarted(" + url + ", " + favicon + ")", trace.categories.Debug);
            }
            this._view._onLoadStarted(url, undefined);
        }

    }

    public onPageFinished(view: android.webkit.WebView, url: string) {
        super.onPageFinished(view, url);

        if (this._view) {
            if (trace.isEnabled()) {
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
                if (trace.isEnabled()) {
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
                if (trace.isEnabled()) {
                    trace.write("WebViewClientClass.onReceivedError(" + error.getErrorCode() + ", " + error.getDescription() + ", " + (error.getUrl && error.getUrl()) + ")", trace.categories.Debug);
                }
                this._view._onLoadFinished(error.getUrl && error.getUrl(), error.getDescription() + "(" + error.getErrorCode() + ")");
            }

        }
    }

}
