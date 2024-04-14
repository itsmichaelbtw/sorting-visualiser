import React, { useState } from "react";

import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from "config/constants";
import { Slider } from "components/ui/Slider";
import { useSortContext } from "hooks";

import { Utility } from "../components/Utility";
import { debounce } from "utils/debounce";

export function Generator() {
  const { columnCount, updateColumnCount, isSorting } = useSortContext();

  const _setValue = debounce((value: number) => {
    updateColumnCount(value);
  }, 100);

  return (
    <Utility>
      <Utility.Node children="Size" />
      <div className="px-4 py-2 w-full flex flex-row items-center sm:min-w-44 min-w-32 sm:max-w-44 max-sm:w-full">
        <Slider
          min={MIN_ARRAY_SIZE}
          max={MAX_ARRAY_SIZE}
          value={columnCount}
          disabled={isSorting}
          onChange={_setValue}
        />
      </div>
      <Utility.Node children={columnCount.toString()} className="w-16" />
    </Utility>
  );
}
