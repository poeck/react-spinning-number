import type { CSSProperties } from "react";

export interface SpinningNumberProps {
  children: string | number;
  fontSize: number;
  className?: string;
  duration?: number;
  stagger?: number;
  style?: Omit<
    CSSProperties,
    "lineHeight" | "fontSize" | "margin" | "padding" | "whiteSpace"
  >;
}
