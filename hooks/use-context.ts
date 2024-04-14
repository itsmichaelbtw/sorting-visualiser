import React, { useContext } from "react";

import { SortContext } from "context/sort";
import { RunnerContext } from "context/runner";

function withDefinedContext<T>(context: React.Context<T>, target: string) {
  const reactContext = useContext(context);

  if (reactContext === undefined) {
    throw new Error(`Context must be defined when using '${target}'`);
  }

  return reactContext;
}

export function useSortContext() {
  return withDefinedContext(SortContext, "useSortContext");
}

export function useRunnerContext() {
  return withDefinedContext(RunnerContext, "useRunnerContext");
}
