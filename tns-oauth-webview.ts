/// <reference path="references.d.ts" />

import { WebView } from 'ui/web-view';

export class TnsOauthWebView extends WebView {
  constructor(
    private _cancelEventHandler: (error?) => void
  ) {
    super();
  }

  public onUnloaded() {
    super.onUnloaded();
    this._cancelEventHandler("User cancelled.");
  }
}