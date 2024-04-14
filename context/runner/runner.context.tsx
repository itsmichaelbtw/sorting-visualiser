import type { Algorithm, WithChildren } from "types";
import type { InitialRunnerContext } from "./runner.interface";
import type { StoreArgs } from "components/containers/canvas/Store";
import type { SortContextInterface } from "context/sort";

import { createContext, useEffect, useReducer } from "react";
import { runnerReducer } from "./runner.reducer";

import { fatalNoop } from "utils/noop";
import { DEFAULT_ALGORITHM } from "config/constants";
import { getAlgorithmClass } from "utils/get-algorithm";

interface Props extends WithChildren, Pick<StoreArgs, "canvasStore"> {
  index: number;
  algorithm: Algorithm;
  isSorting: boolean;
  sortInjector: SortContextInterface["sortInjector"];
}

const INITIAL_STATE: InitialRunnerContext = {
  algorithm: DEFAULT_ALGORITHM,
  isRunning: false,
  lastSortingTime: -1,
  dispatch: fatalNoop
};

export const RunnerContext = createContext(INITIAL_STATE);

export function RunnerProvider({
  index,
  algorithm,
  isSorting,
  canvasStore,
  sortInjector,
  children
}: Props) {
  const [state, dispatch] = useReducer(runnerReducer, {
    ...INITIAL_STATE,
    algorithm
  });

  useEffect(() => {
    sortInjector.updateSortStatus(index, "idle");
  }, []);

  useEffect(() => {
    dispatch({
      type: "SET_ALGORITHM",
      payload: {
        algorithm: algorithm
      }
    });
  }, [algorithm]);

  useEffect(() => {
    handleSortingChange();
  }, [isSorting]);

  function handleSortingChange() {
    dispatch({
      type: "SET_IS_RUNNING",
      payload: {
        isRunning: isSorting
      }
    });

    if (isSorting) {
      sort();
    }
  }

  async function sort() {
    sortInjector.updateSortStatus(index, "sorting");

    const algorithm = getAlgorithmClass(state.algorithm);
    const instance = new algorithm(canvasStore.reRenderCanvas, index, sortInjector);

    await instance.sort(canvasStore.getColumnHeights(index));

    dispatch({
      type: "DISPATCH",
      payload: {
        isRunning: false,
        lastSortingTime: sortInjector.sortTimes[index]
      }
    });

    sortInjector.updateSortStatus(index, "done");
  }

  return <RunnerContext.Provider value={{ ...state, dispatch }}>{children}</RunnerContext.Provider>;
}

export const RunnerConsumer = RunnerContext.Consumer;
