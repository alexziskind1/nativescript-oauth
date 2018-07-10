/// <reference path="references.d.ts" />

import { Page } from 'ui/page';
import { GridLayout } from 'ui/layouts/grid-layout';
import { StackLayout } from 'ui/layouts/stack-layout';
import { isAndroid } from 'tns-core-modules/platform';
import { TnsOauthWebView } from './tns-oauth-webview';
//import { TnsOAuthWebViewDelegateImpl } from './tns-oauth-webview';
import { TnsOAuthWebViewHelper } from './tns-oauth-webview-helper';
import { WebView } from 'ui/web-view';
import { topmost } from "ui/frame";


export class TnsOAuthPageProvider {
    private _checkCodeIntercept: (WebView, error?, url?) => boolean;
    private _cancelEventHandler: (error?) => void;
    private _authUrl: string;
    private _redirectUrl: string;

    constructor(checkCodeIntercept, authUrl, cancelEventHandler, redirectUrl) {
        this._checkCodeIntercept = checkCodeIntercept;
        this._cancelEventHandler = cancelEventHandler;
        this._authUrl = authUrl;
        this._redirectUrl = redirectUrl;
    }

    public loginPageFunc() {
        let wv = new TnsOauthWebView(this._cancelEventHandler);

        wv.on(WebView.loadStartedEvent, (args: any) => {
            const url = args.url;
            console.log('Redirect URL');
            console.log(this._redirectUrl);

            // Handle LinkedIn Cancel button clicked by stopping loading and exiting the web view
            if (url.toLowerCase().startsWith(this._redirectUrl.toLowerCase())) {
                console.log('Inside redirect URL');
                if (args.url.indexOf('error=') > -1) {
                    console.log('Aborting login as user clicked cancel');
                    wv.stopLoading();
                    topmost().goBack();
                }
            }
        });

        TnsOAuthWebViewHelper.initWithWebViewAndIntercept(wv, this._checkCodeIntercept);

        let grid = new GridLayout();
        grid.addChild(wv);

        let stack = new StackLayout();
        stack.addChild(grid);

        let page = new Page();
        page.content = stack;

        if (isAndroid) {
            page.actionBarHidden = true;
        }

        wv.src = this._authUrl;

        return page;
    };
}
