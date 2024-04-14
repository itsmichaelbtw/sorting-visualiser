import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useSortContext } from "hooks";

import { StandardView, CompareView } from "./views";
import { Canvas } from "../canvas";

export function ViewRender() {
  const { viewMode, columnCount, isSorting, algorithm, sortInjector } = useSortContext();

  return (
    <div className="lg:h-full w-full shadow rounded bg-slate-700 overflow-hidden z-10">
      <AnimatePresence mode="wait">
        {viewMode === "standard" ? (
          <Canvas.Store refCount={1} columnCount={columnCount}>
            {({ assignRef, canvasStore }) => (
              <motion.div
                key="standard"
                ref={assignRef(0, "parent")}
                initial={{ opacity: 0, y: "-15%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-15%" }}
                transition={{ duration: 0.2 }}
                className="h-full w-full max-lg:h-[50rem]"
              >
                <StandardView
                  canvasStore={canvasStore}
                  isSorting={isSorting}
                  algorithm={algorithm}
                  sortingInjector={sortInjector}
                  runner={(config) => {
                    return <canvas ref={assignRef(config.index, "canvas")} />;
                  }}
                />
              </motion.div>
            )}
          </Canvas.Store>
        ) : (
          <motion.div
            key="compare"
            initial={{ opacity: 0, y: "15%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "15%" }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            <Canvas.Store refCount={4} columnCount={columnCount}>
              {({ assignRef, canvasStore }) => (
                <CompareView
                  canvasStore={canvasStore}
                  isSorting={isSorting}
                  assignRef={assignRef}
                  sortingInjector={sortInjector}
                  runner={(config) => {
                    return <canvas ref={assignRef(config.index, "canvas")} />;
                  }}
                />
              )}
            </Canvas.Store>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
