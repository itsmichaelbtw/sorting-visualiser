import type { ColumnHeight } from "components/containers/canvas/Store";

import { BaseAlgorithmInstance } from "./algorithm";

export class HeapSort extends BaseAlgorithmInstance {
  async sort(array: ColumnHeight[]): Promise<void> {
    await this.iterator(array, async (callback) => {
      let n = array.length;

      const heapify = async (array: ColumnHeight[], n: number, i: number) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && array[left].height > array[largest].height) {
          largest = left;
        }

        if (right < n && array[right].height > array[largest].height) {
          largest = right;
        }

        if (largest !== i) {
          this.swap(array, i, largest);

          await callback();
          await heapify(array, n, largest);
        }
      };

      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i);
      }

      for (let i = n - 1; i > 0; i--) {
        this.swap(array, 0, i);

        await callback();
        await heapify(array, i, 0);
      }
    });
  }
}
