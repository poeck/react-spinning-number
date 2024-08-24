import { useEffect, useRef, useState } from "react";

import type { SpinningNumbersProps } from "../types/props";

interface DigitProps
  extends Omit<SpinningNumbersProps, "stagger" | "children"> {
  char: string | null;
  delay?: number;
  loaded: boolean;
}

export function Digit({
  char,
  delay,
  loaded,
  className,
  style,
  fontSize = 1,
  duration = 300,
}: DigitProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [width, setWidth] = useState(0);
  const [previousValue, setPreviousValue] = useState(char);

  const customStyle = {
    ...style,
    lineHeight: 1,
    margin: 0,
    fontSize: `${fontSize}rem`,
    whiteSpace: "pre",
  };

  useEffect(() => {
    if (!ref.current) return;
    setWidth(ref.current?.getBoundingClientRect().width);
  }, [ref, fontSize, char, style]);

  useEffect(() => {
    if (char !== null) return;
    setWidth(0);
  }, [char]);

  useEffect(() => {
    if (char === null) return;
    setPreviousValue(char);
  }, [char]);

  if (char === null)
    return (
      <div
        aria-hidden="true"
        style={{
          width,
          transitionDelay: `${delay}ms`,
          transitionDuration: `${duration}ms`,
          overflow: "hidden",
          transitionProperty: loaded ? "all" : "none",
        }}
      >
        <p aria-hidden="true" style={customStyle} className={className}>
          {previousValue}
        </p>
      </div>
    );

  if (!/^\d+$/.test(char))
    return (
      <p aria-hidden="true" style={customStyle} className={className}>
        {char}
      </p>
    );

  return (
    <div
      style={{
        height: `${fontSize}rem`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          width,
          transitionDelay: `${delay}ms`,
          transitionDuration: `${duration}ms`,
          transitionProperty: loaded ? "all" : "none",
        }}
      >
        <p
          ref={ref}
          style={{
            ...customStyle,
            display: "inline-block",
            opacity: 0,
          }}
          aria-hidden="true"
          className={className || ""}
        >
          {char}
        </p>
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          transform: `translateY(${Number(char) * -1 * fontSize}rem)`,
          transitionDelay: `${delay}ms`,
          transitionDuration: `${duration}ms`,
          transitionProperty: "transform",
        }}
      >
        {new Array(10).fill(null).map((_, i) => (
          <p key={i} style={customStyle} className={className}>
            {i}
          </p>
        ))}
      </div>
    </div>
  );
}
