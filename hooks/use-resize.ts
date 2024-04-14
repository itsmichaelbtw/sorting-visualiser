"use client";

import { useEffect, useRef, useLayoutEffect } from "react";

import { debounce } from "utils/debounce";

interface Props {
  onResize(width: number, height: number): void;
  delay?: number;
  dependencies?: any[];
}

export function useResize({ onResize, delay, dependencies = [] }: Props): null {
  const _callback = useRef<Function>();

  useLayoutEffect(() => {
    if (typeof delay === "number") {
      _callback.current = debounce(() => {
        onResize(window.innerWidth, window.innerHeight);
      }, delay);
    } else {
      _callback.current = () => {
        onResize(window.innerWidth, window.innerHeight);
      };
    }

    return () => {
      _callback.current = undefined;
    };
  }, dependencies);

  useEffect(() => {
    function handler() {
      if (_callback.current) {
        _callback.current();
      }
    }

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [onResize, delay]);

  return null;
}
