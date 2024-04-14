import type { MovePosition } from "hooks";

import React, { useRef, useEffect } from "react";

import { useMove } from "hooks";
import { clamp } from "utils/clamp";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  min: number;
  max: number;
  value: number;
  disabled?: boolean;
  onChange(value: number): void;
}

export function Slider({ min, max, value, disabled, onChange }: Props): React.ReactElement {
  const barRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    computeInitialPosition();
  }, [min, max, value]);

  const { ref } = useMove({
    onMove: onMove
  });

  function normalise(value: number, dir: "to" | "from" = "to") {
    switch (dir) {
      case "to": {
        return (value - min) / (max - min);
      }

      case "from": {
        return Math.round((value / 100) * (max - min) + min);
      }
    }
  }

  function computeInitialPosition() {
    const scaled = normalise(value, "to") * 100;
    applyStyle(scaled);
  }

  function onMove(position: MovePosition) {
    const scaled = clamp(position.x * 100, 0, 100);

    applyStyle(scaled);

    onChange(normalise(scaled, "from"));
  }

  function applyStyle(value: number) {
    const asPercentage = `${value}%`;

    barRef.current!.style.width = asPercentage;
    thumbRef.current!.style.left = asPercentage;
  }

  return (
    <div
      ref={ref}
      className="relative w-full h-1 bg-slate-800 shadow-md rounded-md flex flex-row items-center"
      data-disabled={disabled}
    >
      <div ref={barRef} className="h-1 absolute z-10 rounded-md bg-blue-400" />

      <div
        ref={thumbRef}
        className="h-4 w-4 -translate-x-3 absolute z-20 bg-blue-400 hover:bg-blue-500 shadow-md rounded-full border-2 border-white cursor-pointer"
      />
    </div>
  );
}
