import type { WithChildren } from "types";

import React from "react";
import clsx from "clsx";

import { useClsx } from "hooks";

interface BaseProps extends WithChildren {
  fill?: boolean;
}

interface NodeProps extends WithChildren {
  className?: string;
}

function _Base({ fill = true, children }: BaseProps) {
  const { classNames, joinCls } = useClsx({
    maxWidth: {
      "max-sm:w-full": fill
    }
  });

  return (
    <div className={joinCls("relatve rounded", classNames.maxWidth)}>
      <div
        className={joinCls(
          "inline-flex flex-row items-center justify-center bg-slate-700 shadow-sm h-10",
          classNames.maxWidth
        )}
      >
        {children}
      </div>
    </div>
  );
}

function _Node({ className, children }: NodeProps) {
  return (
    <div className={clsx("px-4 py-2 bg-slate-800 rounded text-center select-none", className)}>
      <span className="font-bold text-white leading-6 text-lg">{children}</span>
    </div>
  );
}

type UtilityType = typeof _Base & {
  Node: typeof _Node;
};

export const Utility = _Base as UtilityType;

Utility.Node = _Node;
