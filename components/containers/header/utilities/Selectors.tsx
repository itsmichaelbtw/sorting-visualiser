import type { Variants } from "framer-motion";

import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "components/ui/Button";
import { Dropdown } from "components/ui/Dropdown";

import { useSortContext } from "hooks";
import { VIEW_MODES, ALGORITHMS } from "config/constants";
import { genRandomCount } from "utils/gen-random-count";

export const VARIANTS: Variants = {
  initial: {
    opacity: 0,
    y: -10
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -10
  }
};

export function Selectors() {
  const { viewMode, algorithm, isSorting, changeViewMode, changeAlgorithm, updateColumnCount } =
    useSortContext();

  function onRandom() {
    updateColumnCount(genRandomCount());
  }

  return (
    <motion.div
      className="relative flex flex-row flex-wrap justify-center items-center w-full lg:px-4 gap-2"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={VARIANTS}
      data-disabled={isSorting}
    >
      <motion.div key="random-button" variants={VARIANTS}>
        <Button color="green" onClick={onRandom}>
          Random
        </Button>
      </motion.div>
      <motion.div key="viewmode-dropdown" variants={VARIANTS}>
        <Dropdown currentValue={viewMode} options={VIEW_MODES} onChange={changeViewMode} />
      </motion.div>
      <AnimatePresence>
        {viewMode === "standard" && (
          <motion.div key="algorithm-dropdown" variants={VARIANTS}>
            <Dropdown
              currentValue={algorithm}
              options={ALGORITHMS}
              onChange={changeAlgorithm}
              viewExtended
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
