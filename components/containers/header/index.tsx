import React from "react";

import { motion } from "framer-motion";

import { Generator } from "./utilities/Generator";
import { Selectors } from "./utilities/Selectors";
import { Timer } from "./utilities/Timer";
import { useSortContext } from "hooks";

export function Header() {
  const { isSorting, dispatchSort, dispatchPause } = useSortContext();

  return (
    <div className="w-full backdrop-blur-sm flex-none supports-backdrop-blur:bg-white/60 py-4 z-50">
      <div className="lg:flex lg:flex-row lg:items-center lg:justify-between max-lg:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:grid-rows-1 md:grid-rows-2 grid-rows-1 lg:custom-grid-header-lg sm:custom-grid-header-md custom-grid-header-sm gap-y-4">
        <div className="custom-grid-item" data-grid-item="generator">
          <motion.div
            initial={{
              opacity: 0,
              x: -10
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            className="relative flex flex-row sm:justify-start justify-center items-center w-full"
          >
            <Generator />
          </motion.div>
        </div>
        <div className="custom-grid-item" data-grid-item="selectors">
          <Selectors />
        </div>
        <div className="custom-grid-item" data-grid-item="timer">
          <motion.div
            initial={{
              opacity: 0,
              x: 10
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            className="relative flex flex-row sm:justify-end justify-center items-center w-full"
          >
            <Timer
              isRunning={isSorting}
              onContinue={() => {}}
              onPause={dispatchPause}
              onStart={() => {
                if (isSorting) {
                  console.warn("Sorting is already in progress.");

                  return;
                }

                dispatchSort(true);
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
