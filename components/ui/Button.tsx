import type { WithChildren } from "types";

import React, { useCallback } from "react";

import { useClsx } from "hooks";

type Props = WithChildren & {
  suffix?: string;
  prefix?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ suffix, prefix, disabled, onClick, children, ...props }: Props) {
  const { classNames } = useClsx({
    button: [
      "bg-blue-500 h-[40px] hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded select-none shadow-md whitespace-nowrap",
      {
        "cursor-not-allowed": disabled,
        "cursor-pointer active:border-none active:mt-1": !disabled
      }
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
      className={classNames.button}
      onClick={onClickInterceptor}
      disabled={disabled}
      type="button"
      tabIndex={0}
      {...props}
    >
      {prefix && <span className={classNames.prefix}>{prefix}</span>}
      <span className={classNames.text}>{children}</span>
      {suffix && <span className={classNames.suffix}>{suffix}</span>}
    </button>
  );
}
