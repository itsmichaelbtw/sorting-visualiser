import type { WithNullable } from "types";

import React, { useEffect, useLayoutEffect, useRef } from "react";

import { useResize } from "hooks/use-resize";
import { MIN_NODE_HEIGHT } from "config/constants";

type RefArray = "canvas" | "parent";
export type RenderCycle = "idle" | "drawing" | "complete" | "paused";

interface ChildrenArgs {
  assignRef(index: number, refArray: RefArray): (element: any) => void;
  canvasStore: {
    reRenderCanvas(index: number, columnHeights: ColumnHeight[], renderCycle: RenderCycle): void;
    getColumnHeights(index: number): ColumnHeight[];
  };
}

export interface ColumnHeight {
  height: number;
  color: string | "inherit";
}

interface Store {
  parentRef: React.MutableRefObject<HTMLDivElement>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  renderCycle: RenderCycle;
  colorAssignment: WithNullable<string>;
  columnHeight: ColumnHeight[];
}

interface Props {
  refCount: number;
  columnCount: number;
  children(args: ChildrenArgs): React.ReactNode;
}

const COLORS: string[] = [
  "#dee2e6",
  "#ffa8a8",
  "#faa2c1",
  "#e599f7",
  "#b197fc",
  "#91a7ff",
  "#74c0fc",
  "#66d9e8",
  "#63e6be",
  "#8ce99a",
  "#c0eb75",
  "#ffe066",
  "#ffc078"
];

function _getRandomColorExcept(indexes: number[]): string {
  const colors = COLORS.filter((_, index) => !indexes.includes(index));

  return colors[Math.floor(Math.random() * colors.length)];
}

export function Store({ refCount, columnCount, children }: Props) {
  const initialColumnHeights = useRef<ColumnHeight[]>([]);
  const store = useRef<Store[]>([]);

  useLayoutEffect(() => {
    _setDimensions();
  }, []);

  useEffect(() => {
    _createInitialColumnHeights();
    _render();
  }, [columnCount]);

  useResize({
    onResize: _resizeCanvas,
    delay: 250,
    dependencies: [columnCount]
  });

  function _createStoreObject(index: number) {
    store.current[index] = {
      parentRef: null as any,
      canvasRef: null as any,
      renderCycle: "idle",
      colorAssignment: null,
      columnHeight: []
    };
  }

  function _getCanvasParent(index: number): HTMLDivElement {
    return store.current[index].parentRef.current;
  }

  function _getCanvas(index: number): HTMLCanvasElement {
    return store.current[index].canvasRef.current;
  }

  function _getContext(index: number): CanvasRenderingContext2D {
    return _getCanvas(index).getContext("2d")!;
  }

  function _getColumnHeight(i: number, j: number): number {
    return store.current[i].columnHeight[j].height;
  }

  function _getColumnHeightObject(index: number): ColumnHeight[] {
    return store.current[index].columnHeight;
  }

  function _getColumnWidth(index: number): number {
    const canvas = _getCanvas(index);

    return (canvas.width - (columnCount + 1) * -1) / columnCount;
  }

  function _getRandomHeight(index: number): number {
    const canvas = _getCanvas(index);
    return Math.floor(Math.random() * (canvas.height - MIN_NODE_HEIGHT + 1)) + MIN_NODE_HEIGHT;
  }

  function _setDimensions(): void {
    for (let i = 0; i < refCount; i++) {
      const parent = _getCanvasParent(i);
      const canvas = _getCanvas(i);

      const canvasWidth = parent.clientWidth;
      const canvasHeight = parent.clientHeight;
      const ratio = window.devicePixelRatio || 1;

      canvas.width = canvasWidth * ratio;
      canvas.height = canvasHeight * ratio;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
    }
  }

  function _createInitialColumnHeights(): void {
    initialColumnHeights.current = [];

    for (let i = 0; i < columnCount; i++) {
      initialColumnHeights.current.push({
        height: _getRandomHeight(0),
        color: "inherit"
      });
    }

    for (let i = 0; i < refCount; i++) {
      store.current[i].columnHeight = [...initialColumnHeights.current];
    }
  }

  function _calculateYPosition(height: number): number {
    const canvas = _getCanvas(0);

    return canvas.height - height;
  }

  function _resizeCanvas(): void {
    _setDimensions();
    _createInitialColumnHeights();
    _render();
  }

  function _assignRef(index: number, ref: RefArray) {
    return (element: any) => {
      if (!store.current[index]) {
        _createStoreObject(index);
      }

      if (ref === "canvas") {
        store.current[index].canvasRef = {
          current: element as HTMLCanvasElement
        };
      } else {
        store.current[index].parentRef = {
          current: element as HTMLDivElement
        };
      }
    };
  }

  function _getColorAssignmentsAsArray(): number[] {
    return store.current
      .filter((storeObject) => !!storeObject.colorAssignment)
      .map((storeObject) => {
        return COLORS.indexOf(storeObject.colorAssignment!);
      });
  }

  function _getColor(index: number) {
    const storeObject = store.current[index];

    if (storeObject.colorAssignment) {
      return storeObject.colorAssignment;
    }

    const colorAssignments = _getColorAssignmentsAsArray();

    return _getRandomColorExcept(colorAssignments);
  }

  function _drawCanvas(index: number) {
    const i = index;

    const context = _getContext(i);
    const canvas = _getCanvas(i);

    context.clearRect(0, 0, canvas.width, canvas.height);

    const columnWidth = _getColumnWidth(i);
    const color = _getColor(i);

    store.current[i].colorAssignment = color;

    for (let j = 0; j < columnCount; j++) {
      const columnHeight = _getColumnHeight(i, j);
      const yPosition = _calculateYPosition(columnHeight);

      context.fillStyle = color;
      context.fillRect(j * (columnWidth + -1), yPosition, columnWidth, columnHeight);
    }
  }

  function _reRenderCanvas(
    index: number,
    columnHeights: ColumnHeight[],
    renderCycle: RenderCycle
  ): void {
    store.current[index].columnHeight = columnHeights;
    store.current[index].renderCycle = renderCycle;

    _drawCanvas(index);

    if (renderCycle === "complete") {
      console.info(`Canvas ${index} has completed rendering`);
    }
  }

  function _render(): void {
    for (let i = 0; i < refCount; i++) {
      _drawCanvas(i);
    }
  }

  return children({
    assignRef: _assignRef,
    canvasStore: {
      reRenderCanvas: _reRenderCanvas,
      getColumnHeights: _getColumnHeightObject
    }
  });
}

export type StoreArgs = ChildrenArgs;
