import type { ContextReducerInterface, InitialStateWithDispatch } from "context/context.types";
import type { Algorithm, ViewModes, Speed } from "types";

export type SortReducerActionType =
  | "SET_VIEW_MODE"
  | "SET_ALGORITHM"
  | "SET_SPEED"
  | "SET_COLUMN_COUNT"
  | "SET_SORTING"
  | "SET_PAUSED";

export type SortAction = ContextReducerInterface<SortReducerActionType, SortContextInterface>;

type SortingStatus = "idle" | "sorting" | "pause" | "done";

interface SortInjector {
  status: SortingStatus[];
  sortTimes: number[];
  updateSortStatus(index: number, status: SortingStatus): void;

  stopSort(index: number): boolean;
}

export interface SortContextInterface {
  viewMode: ViewModes;
  algorithm: Algorithm;
  speed: Speed;
  columnCount: number;
  isPaused: boolean;
  isSorting: boolean;
  sortInjector: SortInjector;
  changeViewMode(viewMode: ViewModes): void;
  changeAlgorithm(algorithm: Algorithm): void;
  adjustSpeed(speed: Speed): void;
  updateColumnCount(columnCount: number): void;
  dispatchSort(value: boolean): void;
  dispatchPause(): void;
}

export type InitialSortContext = InitialStateWithDispatch<
  SortReducerActionType,
  SortContextInterface
> &
  SortContextInterface;
