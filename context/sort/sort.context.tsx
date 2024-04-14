import type { WithChildren } from "types";
import type { InitialSortContext } from "./sort.interface";

import { createContext, useLayoutEffect, useReducer, useRef } from "react";
import { sortReducer } from "./sort.reducer";

import { fatalNoop } from "utils/noop";
import {
  DEFAULT_ALGORITHM,
  DEFAULT_ANIMATION_SPEED,
  DEFAULT_VIEW_MODE,
  INITIAL_ARRAY_SIZE
} from "config/constants";

const INITIAL_STATE: InitialSortContext = {
  algorithm: DEFAULT_ALGORITHM,
  viewMode: DEFAULT_VIEW_MODE,
  speed: DEFAULT_ANIMATION_SPEED,
  columnCount: INITIAL_ARRAY_SIZE,
  isPaused: false,
  isSorting: false,
  sortInjector: null as any,
  changeViewMode: fatalNoop,
  changeAlgorithm: fatalNoop,
  adjustSpeed: fatalNoop,
  updateColumnCount: fatalNoop,
  dispatchSort: fatalNoop,
  dispatchPause: fatalNoop,
  dispatch: fatalNoop
};

export const SortContext = createContext(INITIAL_STATE);

export function SortProvider({ children }: WithChildren) {
  const [state, dispatch] = useReducer(sortReducer, INITIAL_STATE);

  const requiresNewColumnCount = useRef<boolean>(false);

  const sortInjector = useRef<InitialSortContext["sortInjector"]>({
    status: [],
    sortTimes: [],
    stopSort(index) {
      return this.status[index] === "pause";
    },
    updateSortStatus(index, status) {
      this.status[index] = status;

      const isFinished = this.status.every((status) => status === "done");

      if (isFinished) {
        for (let i = 0; i < this.status.length; i++) {
          this.status[i] = "idle";
        }

        dispatchSort(false);

        requiresNewColumnCount.current = true;
      }
    }
  });

  useLayoutEffect(() => {
    sortInjector.current.status = [];
  }, [state.viewMode]);

  function changeViewMode(viewMode: InitialSortContext["viewMode"]) {
    dispatch({
      type: "SET_VIEW_MODE",
      payload: {
        viewMode: viewMode
      }
    });
  }

  function changeAlgorithm(algorithm: InitialSortContext["algorithm"]) {
    dispatch({
      type: "SET_ALGORITHM",
      payload: {
        algorithm: algorithm
      }
    });
  }

  function adjustSpeed(speed: InitialSortContext["speed"]) {
    dispatch({
      type: "SET_SPEED",
      payload: {
        speed: speed
      }
    });
  }

  function updateColumnCount(columnCount: number) {
    dispatch({
      type: "SET_COLUMN_COUNT",
      payload: {
        columnCount: columnCount
      }
    });

    requiresNewColumnCount.current = false;
  }

  function dispatchSort(value: boolean) {
    if (requiresNewColumnCount.current) {
      return;
    }

    dispatch({
      type: "SET_SORTING",
      payload: {
        isSorting: value
      }
    });
  }

  function dispatchPause() {
    dispatch({
      type: "SET_PAUSED",
      payload: {}
    });

    sortInjector.current.status = sortInjector.current.status.map(() => "pause");
  }

  return (
    <SortContext.Provider
      value={{
        ...state,
        changeViewMode,
        changeAlgorithm,
        adjustSpeed,
        updateColumnCount,
        dispatchSort,
        dispatchPause,
        sortInjector: sortInjector.current,
        dispatch
      }}
    >
      {children}
    </SortContext.Provider>
  );
}

export const SortConsumer = SortContext.Consumer;
