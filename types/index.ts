type WithBaseGeneric = "required" | "optional";

/**
 * Adds children to a component. By default, children are required.
 */
export type WithChildren<
  T extends WithBaseGeneric = "required",
  R = React.ReactNode
> = T extends "required" ? { children: R } : { children?: R };

export type WithNullable<T> = T | null | undefined | void;

export type ViewModes = "standard" | "compare";
export type Speed = "slow" | "normal" | "fast";
export type Algorithm = "bubble" | "insertion" | "selection" | "merge" | "quick" | "heap";
