import React, { useCallback } from "react";

import { useClsx } from "hooks";

type Color = "green" | "blue" | "yellow";

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix"> {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  disabled?: boolean;
  color?: Color;
}

const COLOR_MAP: Record<Color, string> = {
  blue: "bg-blue-500 border-blue-700 hover:bg-blue-400",
  green: "bg-emerald-500 border-emerald-700 hover:bg-emerald-400",
  yellow: "bg-yellow-500 border-yellow-700 hover:bg-yellow-400"
};

export function Button({
  suffix,
  prefix,
  color = "blue",
  disabled,
  onClick,
  children,
  className,
  ...props
}: Props): React.ReactElement {
  const { classNames } = useClsx({
    button: [
      "relative",
      "inline-flex",
      "h-[40px]",
      "hover:bg-blue-400",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "border-b-4",
      "rounded",
      "select-none",
      "shadow-md",
      "whitespace-nowrap",
      {
        "cursor-not-allowed": disabled,
        "cursor-pointer active:border-none active:translate-y-1": !disabled
      },
      COLOR_MAP[color],
      className
    ],
    prefix: [],
    text: ["align-middle inline-block leading-[18px]"],
    suffix: ["align-middle inline-block ml-[4px]"]
  });

  const onClickInterceptor = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    },
    [onClick, disabled]
  );

  return (
    <button
      {...props}
      className={classNames.button}
      onClick={onClickInterceptor}
      disabled={disabled}
      type="button"
      tabIndex={0}
    >
      {prefix && <span className={classNames.prefix}>{prefix}</span>}
      <span className={classNames.text}>{children}</span>
      {suffix && <span className={classNames.suffix}>{suffix}</span>}
    </button>
  );
}
