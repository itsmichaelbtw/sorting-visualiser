import type { Algorithm } from "types";

import {
  BubbleSort,
  InsertionSort,
  SelectionSort,
  MergeSort,
  QuickSort,
  HeapSort
} from "algorithms";

type ClassTypeCast<T extends Algorithm> = T extends "bubble"
  ? typeof BubbleSort
  : T extends "insertion"
  ? typeof InsertionSort
  : T extends "selection"
  ? typeof SelectionSort
  : T extends "merge"
  ? typeof MergeSort
  : T extends "quick"
  ? typeof QuickSort
  : T extends "heap"
  ? typeof HeapSort
  : never;

export function getAlgorithmClass<T extends Algorithm>(algo: T): ClassTypeCast<T> {
  switch (algo) {
    case "bubble":
      return BubbleSort as ClassTypeCast<T>;

    case "insertion":
      return InsertionSort as ClassTypeCast<T>;

    case "selection":
      return SelectionSort as ClassTypeCast<T>;

    case "merge":
      return MergeSort as ClassTypeCast<T>;

    case "quick":
      return QuickSort as ClassTypeCast<T>;

    case "heap":
      return HeapSort as ClassTypeCast<T>;

    default:
      throw new Error(`Unknown algorithm: ${algo}`);
  }
}
