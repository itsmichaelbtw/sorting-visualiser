import type { StoreArgs } from "components/containers/canvas/Store";
import type { Algorithm } from "types";
import type { BaseViewProps } from "./types";

import { RunnerProvider } from "context/runner";

interface Props extends BaseViewProps, Pick<StoreArgs, "canvasStore"> {
  algorithm: Algorithm;
}

export function StandardView({
  algorithm,
  isSorting,
  canvasStore,
  runner,
  sortingInjector
}: Props) {
  return (
    <RunnerProvider
      index={0}
      isSorting={isSorting}
      algorithm={algorithm}
      canvasStore={canvasStore}
      sortInjector={sortingInjector}
    >
      {runner({
        viewMode: "standard",
        columnCount: -1,
        index: 0
      })}
    </RunnerProvider>
  );
}
