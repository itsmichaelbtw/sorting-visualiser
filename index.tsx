import type { WithChildren } from "./types";

import "./css/tailwind.css";

import React from "react";
import ReactDom from "react-dom/client";

import { App } from "components/App";
import { RestrictEnvironment } from "components/elements/RestrictEnvironment";
import { LazyComponent } from "components/elements/LazyComponent";

const container = document.querySelector("#root");
const root = ReactDom.createRoot(container!);

function WithStrictMode({ children }: WithChildren) {
  if (NODE_ENVIRONMENT === "production") {
    return children;
  }

  return <React.StrictMode>{children}</React.StrictMode>;
}

root.render(
  <WithStrictMode>
    <App />
    <RestrictEnvironment environment="development">
      <LazyComponent
        objectName="DeveloperMenu"
        __import={() => {
          return import("components/elements/DeveloperMenu");
        }}
      />
    </RestrictEnvironment>
  </WithStrictMode>
);
