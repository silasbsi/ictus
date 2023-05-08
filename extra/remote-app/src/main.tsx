/* eslint-disable no-console */
/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

import { Root, createRoot } from "react-dom/client";

import ClayIconProvider from "./common/provider/ClayIconProvider";

const NoRouteSelected = () => (
  <div className="ictus-app">No route selected</div>
);

export type IctusComponentType = {
  [key: string]: JSX.Element;
};

const IctusComponent: IctusComponentType = {
  "no-route-selected": <NoRouteSelected />,
};

class IctusRemoteAppComponent extends HTMLElement {
  public root: Root | undefined;

  connectedCallback() {
    type propertyType = {
      route: string;
    };

    const properties: propertyType = {
      route: this.getAttribute("route") || "no-route-selected",
    };

    if (!this.root) {
      this.root = createRoot(this);

      this.root.render(
        <ClayIconProvider>{IctusComponent[properties.route]}</ClayIconProvider>
      );
    }
  }
}

const ELEMENT_NAME = "liferay-remote-app-ictus";

if (!customElements.get(ELEMENT_NAME)) {
  customElements.define(ELEMENT_NAME, IctusRemoteAppComponent);
}
