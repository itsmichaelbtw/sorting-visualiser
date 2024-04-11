import React, { useEffect, useState, useRef } from "react";

import { clamp } from "utils/clamp";

export interface MovePosition {
  x: number;
}

interface Props {
  onMove(position: MovePosition): void;
}

interface UseMoveHook {
  ref: React.RefObject<HTMLDivElement>;
}

export function useMove({ onMove }: Props): UseMoveHook {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useRef<boolean>(false);
  const isSliding = useRef<boolean>(false);
  const frame = useRef<number>(0);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (ref.current) {
      attachMainListeners();
    }

    return () => {
      if (ref.current) {
        detachMainListeners();
      }
    };
  }, []);

  function attachMainListeners() {
    ref.current!.addEventListener("mousedown", onMouseDown);
    ref.current!.addEventListener("touchstart", onTouchStart, { passive: false });
  }

  function detachMainListeners() {
    ref.current!.removeEventListener("mousedown", onMouseDown);
    ref.current!.removeEventListener("touchstart", onTouchStart);
  }

  function attachSecondaryListeners() {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  }

  function detachSecondaryListeners() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }

  function initiateMove() {
    if (isSliding.current || !mounted.current) {
      return;
    }

    isSliding.current = true;

    attachSecondaryListeners();
  }

  function destroyMove() {
    if (!isSliding.current || !mounted.current) {
      return;
    }

    isSliding.current = false;
    detachSecondaryListeners();
  }

  function onMouseDown(event: MouseEvent) {
    initiateMove();

    event.preventDefault();
    onMouseMove(event);
  }

  function onMouseMove(event: MouseEvent) {
    _move({ x: event.clientX });
  }

  function onMouseUp() {
    destroyMove();
  }

  function onTouchStart(event: TouchEvent) {
    if (event.cancelable) {
      event.preventDefault();
    }

    initiateMove();
    onTouchMove(event);
  }

  function onTouchMove(event: TouchEvent) {
    if (event.cancelable) {
      event.preventDefault();
    }

    _move({ x: event.changedTouches[0].clientX });
  }

  function onTouchEnd() {
    destroyMove();
  }

  function _move(position: MovePosition) {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      if (mounted.current && ref.current) {
        ref.current.style.userSelect = "none";

        const rect = ref.current.getBoundingClientRect();

        if (rect.width && rect.height) {
          const left = position.x - rect.left;
          const x = clamp(left / rect.width, 0, 1);

          onMove({ x });
        }
      }
    });
  }

  return {
    ref: ref
  };
}
