import type { Variants } from "framer-motion";

import type { BaseViewProps } from "./types";
import type { StoreArgs } from "components/containers/canvas/Store";

import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ALGORITHMS, COMPARE_VIEWS, DEFAULT_ALGORITHM } from "config/constants";
import { RunnerConsumer, RunnerProvider } from "context/runner";
import { Clock } from "components/elements/Clock";
import { Dropdown } from "components/ui/Dropdown";
import { useClsx } from "hooks";

const VARIANTS: Variants = {
  initial: {
    opacity: 0,
    y: -10
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -10
  }
};

interface Props extends BaseViewProps, StoreArgs {}

export function CompareView({ isSorting, sortingInjector, runner, canvasStore, assignRef }: Props) {
  const {} = useClsx({
    overlayItem: "px-2 py-1 bg-bacl"
  });

  return (
    <div className="grid grid-cols-1 grid-rows-4 h-full gap-2 p-2 lg:grid-cols-2 lg:grid-rows-2">
      {Array.from({ length: COMPARE_VIEWS }).map((_, index) => {
        return (
          <RunnerProvider
            key={`compare-algorithm-provider-${index}`}
            index={index}
            canvasStore={canvasStore}
            isSorting={isSorting}
            algorithm={DEFAULT_ALGORITHM}
            sortInjector={sortingInjector}
          >
            <RunnerConsumer>
              {({ algorithm, lastSortingTime, isRunning, dispatch }) => (
                <div
                  className="relative inline-block bg-slate-800 rounded shadow overflow-hidden max-lg:min-h-52"
                  ref={assignRef(index, "parent")}
                >
                  <div className="absolute top-0 bottom-0 left-0 right-0 z-1 p-2">
                    <AnimatePresence>
                      <React.Fragment>
                        {!isRunning && (
                          <motion.div
                            key={`compare-algorithm-dropdown-${index}`}
                            variants={VARIANTS}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <Dropdown
                              currentValue={algorithm}
                              onChange={(value) => {
                                dispatch({
                                  type: "SET_ALGORITHM",
                                  payload: {
                                    algorithm: value
                                  }
                                });
                              }}
                              options={ALGORITHMS}
                              viewExtended
                            />
                          </motion.div>
                        )}

                        {isRunning || lastSortingTime > 0 ? (
                          <motion.div
                            key={`compare-algorithm-timer-${index}`}
                            variants={VARIANTS}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute bottom-0 left-0 mb-2 ml-2 pointer-events-none flex flex-row gap-x-2"
                          >
                            <div className="px-2 py-1 bg-black bg-opacity-50 rounded text-white shadow font-bold w-[100px]">
                              <Clock
                                startTimer={isRunning}
                                onTimeUpdate={(time) => {
                                  sortingInjector.sortTimes[index] = time;
                                }}
                              />
                            </div>

                            {isRunning && (
                              <div className="px-2 py-1 bg-black bg-opacity-50 rounded text-white shadow capitalize font-bold">
                                {`${algorithm} Sort`}
                              </div>
                            )}
                          </motion.div>
                        ) : null}
                      </React.Fragment>
                    </AnimatePresence>
                  </div>
                  {runner({
                    viewMode: "compare",
                    columnCount: -1,
                    index: index
                  })}
                </div>
              )}
            </RunnerConsumer>
          </RunnerProvider>
        );
      })}
    </div>
  );
}
