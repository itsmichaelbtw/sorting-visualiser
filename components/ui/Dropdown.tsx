import React, { useMemo } from "react";

import { Listbox, ListboxOptionsProps } from "@headlessui/react";

import { useClsx } from "hooks";
import { Button } from "./Button";

export interface Option<T extends string> {
  label: string;
  value: T;
}

interface Props<T extends string> {
  options: Option<T>[];
  currentValue: T;
  onChange?(value: T): void;
  disabled?: boolean;
  viewExtended?: boolean;
}

export function Dropdown<T extends string>({
  options,
  currentValue,
  disabled,
  viewExtended,
  onChange
}: Props<T>): React.ReactElement {
  const { classNames, joinCls } = useClsx({
    optionsList: [
      "absolute",
      "z-10",
      "mt-1",
      "left-0",
      "max-h-120",
      "py-[4px]",
      "max-h-[180px]",
      "flex",
      "flex-col",
      "flex-wrap",
      "rounded",
      "shadow-md",
      "bg-slate-700",
      {
        "w-screen max-w-[280px]": viewExtended,
        "w-full": !viewExtended
      }
    ],
    option: ["px-[8px]", "py-[6px]", "cursor-pointer", "font-bold", "text-md", "text-white"],
    selected: ["bg-slate-800", "text-white"],
    unselected: ["hover:bg-slate-800", "hover:text-white"]
  });

  const currentValueLabel = useMemo(() => {
    const option = options.find((option) => option.value === currentValue);
    return option?.label || "";
  }, [currentValue, options]);

  return (
    <div className="relative inline-block">
      <Listbox value={currentValue} onChange={onChange} disabled={disabled}>
        <Listbox.Button>
          <Button
            className="capitalize"
            suffix={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            }
            disabled={disabled}
            area-disabled={disabled}
          >
            {currentValueLabel}
          </Button>
        </Listbox.Button>
        <Listbox.Options className={classNames.optionsList}>
          {options.map((option, index) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className={({ selected }) => {
                return joinCls(
                  classNames.option,
                  selected ? classNames.selected : classNames.unselected
                );
              }}
            >
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
