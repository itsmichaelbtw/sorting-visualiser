import type { WithNullable } from "types";

import React, { useEffect, useRef } from "react";

import { TIMER_FRAMERATE } from "config/constants";

interface Props {
  startTimer: boolean;
  clearOnStart?: boolean;
  onTimeUpdate?(time: number): void;
}

const SECOND = 1000;
const MINUTE = SECOND * 60;

function getNow() {
  return new Date().getTime();
}

function formatTime(time: number) {
  const ms = time % 1000;
  const s = Math.floor((time / SECOND) % 60);
  const m = Math.floor((time / MINUTE) % 60);

  const minStr = m.toString().padStart(2, "0");
  const secStr = s.toString().padStart(2, "0");
  const msStr = ms.toString().padStart(3, "0");

  return `${minStr}:${secStr}.${msStr}`;
}

export function Clock({ startTimer, clearOnStart = true, onTimeUpdate }: Props) {
  const startTime = useRef(0);
  const timerRef = useRef<HTMLSpanElement>(null);
  const interval = useRef<WithNullable<NodeJS.Timeout>>(null);

  useEffect(() => {
    if (startTimer) {
      _handleStart();
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [startTimer]);

  function _handleStart() {
    startTime.current = getNow();

    interval.current = setInterval(() => {
      _updateTime();
    }, TIMER_FRAMERATE);
  }

  function _updateTime() {
    if (!timerRef.current) {
      return;
    }

    const time = getNow() - startTime.current;

    timerRef.current.textContent = formatTime(time);

    if (onTimeUpdate) {
      onTimeUpdate(time);
    }
  }

  return <span ref={timerRef}>{formatTime(0)}</span>;
}
