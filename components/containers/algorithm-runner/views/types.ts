import type { RunnerConfig } from "../types";
import type { SortContextInterface } from "context/sort";

export interface BaseViewProps {
  isSorting: boolean;
  sortingInjector: SortContextInterface["sortInjector"];
  runner(config: RunnerConfig): React.ReactNode;
}
