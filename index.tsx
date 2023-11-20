import type { WithChildren } from "./types";

import "./css/tailwind.css";

import React from "react";
import ReactDom from "react-dom/client";

import { App } from "components/App";
import { DevelopmentEnvironment } from "components/containers/developer-menu/DevelopmentEnvironment";

const DeveloperMenu = React.lazy(() =>
  import("components/containers/developer-menu/DeveloperMenu").then(({ DeveloperMenu }) => ({
    default: DeveloperMenu
  }))
);

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
    <DevelopmentEnvironment>
      <DeveloperMenu />
    </DevelopmentEnvironment>
  </WithStrictMode>
);
