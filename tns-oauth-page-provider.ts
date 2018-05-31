/// <reference path="references.d.ts" />

import { Page } from 'ui/page';
import { GridLayout } from 'ui/layouts/grid-layout';
import { StackLayout } from 'ui/layouts/stack-layout';
import { isAndroid } from 'tns-core-modules/platform';
import { TnsOauthWebView } from './tns-oauth-webview';
//import { TnsOAuthWebViewDelegateImpl } from './tns-oauth-webview';
import { TnsOAuthWebViewHelper } from './tns-oauth-webview-helper';


export class TnsOAuthPageProvider {
    private _checkCodeIntercept: (WebView, error?, url?) => boolean;
    private _cancelEventHandler: (error?) => void;
    private _authUrl: string;

    constructor(checkCodeIntercept, authUrl, cancelEventHandler) {
        this._checkCodeIntercept = checkCodeIntercept;
        this._cancelEventHandler = cancelEventHandler;
        this._authUrl = authUrl;
    }

    public loginPageFunc() {
        let wv = new TnsOauthWebView(this._cancelEventHandler);

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
