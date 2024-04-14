import type { ColumnHeight } from "components/containers/canvas/Store";

import { BaseAlgorithmInstance } from "./algorithm";

export class InsertionSort extends BaseAlgorithmInstance {
  async sort(array: ColumnHeight[]): Promise<void> {
    await this.iterator(array, async (callback) => {
      let n = array.length;

      for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j].height > key.height) {
          array[j + 1] = array[j];
          j = j - 1;

          await callback();
        }

        array[j + 1] = key;
      }
    });
  }
}
