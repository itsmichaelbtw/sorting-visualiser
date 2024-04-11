import type { ColumnHeight } from "components/containers/canvas/Store";

import { BaseAlgorithmInstance } from "./algorithm";

export class SelectionSort extends BaseAlgorithmInstance {
  async sort(array: ColumnHeight[]): Promise<void> {
    await this.iterator(array, async (callback) => {
      let n = array.length;

      for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
          if (array[j].height < array[minIndex].height) {
            minIndex = j;
          }
        }

        this.swap(array, i, minIndex);

        await callback();
      }
    });
  }
}
