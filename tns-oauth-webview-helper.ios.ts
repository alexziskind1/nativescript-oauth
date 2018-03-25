/// <reference path="references.d.ts" />

import { WebView } from 'ui/web-view';

export class TnsOAuthWebViewHelper extends NSObject implements WKNavigationDelegate {
    public static ObjCProtocols = [WKNavigationDelegate];

    private _owner: WeakRef<WebView>;
    private _origDelegate: any; //UIWebViewDelegateImpl
    private _checkCodeIntercept: (WebView, error?, url?) => boolean;

    constructor() {
        super();
    }

    public static initWithWebViewAndIntercept(wv: WebView, checkCodeIntercept) {
        (<any>wv)._delegate = TnsOAuthWebViewHelper.initWithOwner(new WeakRef(wv), checkCodeIntercept);
    }

    private static initWithOwner(owner: WeakRef<WebView>, checkCodeIntercept): TnsOAuthWebViewHelper {
        let delegate = new TnsOAuthWebViewHelper();
        delegate._owner = owner;
        delegate._origDelegate = (<any>owner.get())._delegate;
        delegate._checkCodeIntercept = checkCodeIntercept;
        return delegate;
    }

    public webViewShouldStartLoadWithRequestNavigationType(webView: WKWebView, request: NSURLRequest, navigationType: number) {
        return this._origDelegate.webViewShouldStartLoadWithRequestNavigationType(webView, request, navigationType);
    }

    public webViewDidStartLoad(webView: WKWebView) {
        this._origDelegate.webViewDidStartLoad(webView);
    }

    public webViewDidFinishLoad(webView: WKWebView) {
        this._checkCodeIntercept(webView, null);
        this._origDelegate.webViewDidFinishLoad(webView);
    }

    public webViewDidFailLoadWithError(webView: WKWebView, error: NSError) {
        this._checkCodeIntercept(webView, error);
        this._origDelegate.webViewDidFailLoadWithError(webView, error);
    }


    public webViewDecidePolicyForNavigationActionDecisionHandler(webView, navigationAction, decisionHandler) {
        //decisionHandler(WKNavigationActionPolicy.Allow);
        this._checkCodeIntercept(webView, null);
        this._origDelegate.webViewDecidePolicyForNavigationActionDecisionHandler(webView, navigationAction, decisionHandler);
    }

    public webViewDidStartProvisionalNavigation(webView, navigation) {
        this._origDelegate.webViewDidStartProvisionalNavigation(webView, navigation);
    }

    public webViewDidFinishNavigation(webView, navigation) {
        this._checkCodeIntercept(webView, null);
        this._origDelegate.webViewDidFinishNavigation(webView, navigation);
    }

    public webViewDidFailNavigationWithError(webView, navigation, error) {
        this._checkCodeIntercept(webView, error);
        this._origDelegate.webViewDidFailNavigationWithError(webView, navigation, error);
    }

}
