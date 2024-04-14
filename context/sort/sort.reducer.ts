import type { SortAction, SortContextInterface } from "./sort.interface";

import { withDispatchReducer } from "context/context.dispatch";

export function sortReducer(state: SortContextInterface, action: SortAction): SortContextInterface {
  const dispatch = withDispatchReducer(state, action);

  return dispatch(() => {
    switch (action.type) {
      case "SET_ALGORITHM":
        return { ...state, algorithm: action.payload.algorithm! };
      case "SET_VIEW_MODE":
        return { ...state, viewMode: action.payload.viewMode! };

      case "SET_COLUMN_COUNT":
        return { ...state, columnCount: action.payload.columnCount! };

      case "SET_SORTING":
        return { ...state, isSorting: action.payload.isSorting!, isPaused: false };

      case "SET_PAUSED":
        return { ...state, isPaused: true, isSorting: false };

      default:
        return state;
    }
  });
}
