import type { RenderCycle, ColumnHeight } from "components/containers/canvas/Store";
import type { SortContextInterface } from "context/sort";

import { TIMER_FRAMERATE } from "config/constants";
import { sleep } from "utils/sleep";

type RenderCallback = (
  index: number,
  columnHeights: ColumnHeight[],
  renderCycle: RenderCycle
) => void;

type SortCallback = (callback: () => Promise<void>) => Promise<void>;

export abstract class BaseAlgorithmInstance {
  constructor(
    public updateRenderCycle: RenderCallback,
    public index: number,
    public injector: SortContextInterface["sortInjector"]
  ) {}

  abstract sort(array: ColumnHeight[]): Promise<void>;

  public async iterator(array: ColumnHeight[], sort: SortCallback): Promise<void> {
    try {
      await sort(async () => {
        this.immediateBreak();
        await this.callbackWithSleep(array);
      });

      this.updateRenderCycle(this.index, array, "complete");
    } catch (error) {
      const _ = error as Error;

      console.warn(_.message);

      this.updateRenderCycle(this.index, array, "paused");
    }
  }

  public swap(array: ColumnHeight[], i: number, j: number): void {
    [array[i], array[j]] = [array[j], array[i]];
  }

  public async callbackWithSleep(array: ColumnHeight[]): Promise<void> {
    this.updateRenderCycle(this.index, array, "drawing");
    await sleep(TIMER_FRAMERATE);
  }

  public immediateBreak(): void {
    if (this.injector.stopSort(this.index)) {
      throw new Error(`Sort (${this.index}) has been stopped.`);
    }
  }
}
