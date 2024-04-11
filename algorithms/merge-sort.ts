import type { ColumnHeight } from "components/containers/canvas/Store";

import { BaseAlgorithmInstance } from "./algorithm";

export class MergeSort extends BaseAlgorithmInstance {
  async sort(array: ColumnHeight[]): Promise<void> {
    await this.iterator(array, async (callback) => {
      const merge = async (array: ColumnHeight[], left: number, mid: number, right: number) => {
        const n1 = mid - left + 1;
        const n2 = right - mid;

        const leftArray = array.slice(left, mid + 1);
        const rightArray = array.slice(mid + 1, right + 1);

        let i = 0;
        let j = 0;
        let k = left;

        while (i < n1 && j < n2) {
          if (leftArray[i].height <= rightArray[j].height) {
            array[k] = leftArray[i];
            i++;
          } else {
            array[k] = rightArray[j];
            j++;
          }

          k++;

          await callback();
        }

        while (i < n1) {
          array[k] = leftArray[i];
          i++;
          k++;

          await callback();
        }

        while (j < n2) {
          array[k] = rightArray[j];
          j++;
          k++;

          await callback();
        }
      };

      const mergeSort = async (array: ColumnHeight[], left: number, right: number) => {
        if (left < right) {
          const mid = Math.floor((left + right) / 2);

          await mergeSort(array, left, mid);
          await mergeSort(array, mid + 1, right);

          await merge(array, left, mid, right);
        }
      };

      await mergeSort(array, 0, array.length - 1);
    });
  }
}
