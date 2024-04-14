import React from "react";

import { SortProvider } from "context/sort";

import { Header } from "components/containers/header";
import { ViewRender } from "./containers/algorithm-runner";

export function App() {
  return (
    <div className="lg:h-screen w-screen flex flex-col max-w-screen-2xl mx-auto">
      <SortProvider>
        <div className="relative lg:h-full w-full lg:flex lg:flex-col items-center justify-center px-4 pb-4">
          <Header />
          <ViewRender />
        </div>
      </SortProvider>
    </div>
  );
}
