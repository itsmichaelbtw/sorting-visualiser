import type { Option } from "components/ui/Dropdown";
import type { ViewModes, Algorithm } from "types";

export const INITIAL_ARRAY_SIZE = 100;
export const MAX_ARRAY_SIZE = 1000;
export const MIN_ARRAY_SIZE = 25;
export const MAX_NODE_HEIGHT = 100;
export const MIN_NODE_HEIGHT = 20;
export const TIMER_FRAMERATE = 2;
export const COMPARE_VIEWS = 4;

export const DEFAULT_ALGORITHM: Algorithm = "bubble";
export const DEFAULT_VIEW_MODE: ViewModes = "standard";

export const VIEW_MODES: Option<ViewModes>[] = [
  {
    label: "Standard",
    value: "standard"
  },
  {
    label: "Compare",
    value: "compare"
  }
];

export const ALGORITHMS: Option<Algorithm>[] = [
  {
    label: "Bubble Sort",
    value: "bubble"
  },
  {
    label: "Insertion Sort",
    value: "insertion"
  },
  {
    label: "Selection Sort",
    value: "selection"
  },
  {
    label: "Merge Sort",
    value: "merge"
  },
  {
    label: "Quick Sort",
    value: "quick"
  },
  {
    label: "Heap Sort",
    value: "heap"
  }
];
