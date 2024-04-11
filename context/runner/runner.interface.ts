import type { ContextReducerInterface, InitialStateWithDispatch } from "context/context.types";
import type { Algorithm } from "types";

export type RunnerActionType = "SET_IS_RUNNING" | "SET_ALGORITHM" | "SET_LAST_SORTING_TIME";

export type RunnerAction = ContextReducerInterface<RunnerActionType, RunnerContextInterface>;

export interface RunnerContextInterface {
  algorithm: Algorithm;
  isRunning: boolean;
  lastSortingTime: number;
}

export type InitialRunnerContext = InitialStateWithDispatch<
  RunnerActionType,
  RunnerContextInterface
> &
  RunnerContextInterface;
