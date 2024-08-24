import { useEffect, useMemo, useRef, useState } from "react";
import { Digit } from "./digit";

import type { SpinningNumberProps } from "../types/props";
import type { Elements } from "../types/elements";

export function SpinningNumber({
  children,
  stagger = 100,
  ...props
}: SpinningNumberProps) {
  const highestNumberCount = useRef(0);
  const lastNumbers = useRef<Elements>([]);

  const [loaded, setLoaded] = useState(false);

  const elements = useMemo(() => {
    let fixedCount = 0;
    let numberCount = 0;
    let changedNumberCount = 0;

    const digits = children.toString().split("");

    const elements: Elements = digits
      .reverse()
      .map((digit) => {
        if (/\d/.test(digit)) {
          numberCount += 1;

          return {
            key: `number-${numberCount}`,
            value: digit,
          };
        } else {
          fixedCount += 1;
          return { key: `fixed-${fixedCount}`, value: digit };
        }
      })
      .reverse()
      .map((element) => {
        if (!element.key.startsWith("number-")) return element;

        const lastNumber = lastNumbers.current.find(
          (number) => number.key === element.key
        );

        if (lastNumber && lastNumber.value !== element.value)
          changedNumberCount += 1;

        return {
          ...element,
          delay: lastNumber ? stagger * (changedNumberCount - 1) : 0,
        };
      });

    const missingElements = highestNumberCount.current - elements.length;

    if (missingElements > 0) {
      const missingElementsArray = new Array(missingElements)
        .fill(null)
        .map((_, index) => ({
          key: `number-${numberCount + index + 1}`,
          value: null,
          delay: 0,
        }))
        .reverse();

      const lastIndex = elements.findIndex(
        (element) => element.key === `number-${numberCount}`
      );

      elements.splice(lastIndex, 0, ...missingElementsArray);
    } else if (elements.length > highestNumberCount.current)
      highestNumberCount.current = elements.length;

    lastNumbers.current = elements.filter((e) => e.key.startsWith("number-"));
    return elements;
  }, [children, stagger]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "start", alignItems: "center" }}
    >
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: "0",
        }}
      >
        {children}
      </span>
      {elements.map((digit) => (
        <Digit
          key={digit.key}
          char={digit.value}
          delay={digit.delay}
          loaded={loaded}
          {...props}
        />
      ))}
    </div>
  );
}
