import "./css/tailwind.css";

import React from "react";
import ReactDom from "react-dom/client";

import { App } from "./containers/App";

const container = document.querySelector("#root");
const root = ReactDom.createRoot(container!);

root.render(<App />);
