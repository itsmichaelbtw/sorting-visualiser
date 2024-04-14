import type { ColumnHeight } from "components/containers/canvas/Store";

import { BaseAlgorithmInstance } from "./algorithm";

export class QuickSort extends BaseAlgorithmInstance {
  async sort(array: ColumnHeight[]): Promise<void> {
    await this.iterator(array, async (callback) => {
      const partition = async (array: ColumnHeight[], low: number, high: number) => {
        let pivot = array[high].height;
        let i = low - 1;

        for (let j = low; j < high; j++) {
          if (array[j].height < pivot) {
            i++;

            this.swap(array, i, j);

            await callback();
          }
        }

        this.swap(array, i + 1, high);

        await callback();

        return i + 1;
      };

      const quickSort = async (array: ColumnHeight[], low: number, high: number) => {
        if (low < high) {
          let pi = await partition(array, low, high);

          await quickSort(array, low, pi - 1);
          await quickSort(array, pi + 1, high);
        }
      };

      await quickSort(array, 0, array.length - 1);
    });
  }
}
