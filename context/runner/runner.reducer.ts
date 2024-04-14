import type { RunnerAction, RunnerContextInterface } from "./runner.interface";

import { withDispatchReducer } from "context/context.dispatch";

export function runnerReducer(
  state: RunnerContextInterface,
  action: RunnerAction
): RunnerContextInterface {
  const dispatch = withDispatchReducer(state, action);

  return dispatch(() => {
    switch (action.type) {
      case "SET_ALGORITHM":
        return { ...state, algorithm: action.payload.algorithm! };

      case "SET_IS_RUNNING":
        return { ...state, isRunning: action.payload.isRunning! };

      case "SET_LAST_SORTING_TIME":
        return { ...state, lastSortingTime: action.payload.lastSortingTime! };

      default:
        return state;
    }
  });
}
