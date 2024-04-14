import type { ColumnHeight } from "components/containers/canvas/Store";

import { BaseAlgorithmInstance } from "./algorithm";

// can add like a statistics object to keep track of comparisons, swaps, etc.
export class BubbleSort extends BaseAlgorithmInstance {
  async sort(array: ColumnHeight[]): Promise<void> {
    await this.iterator(array, async (callback) => {
      let n = array.length;
      let swapped = false;

      do {
        swapped = false;

        for (let i = 0; i < n - 1; i++) {
          if (array[i].height > array[i + 1].height) {
            this.swap(array, i, i + 1);

            swapped = true;

            await callback();
          }
        }
      } while (swapped);
    });
  }
}
