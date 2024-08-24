# react-spinning-numbers 🎉

Welcome to `react-spinning-numbers`! If you're tired of boring static numbers in your React app, then get ready to spin things up—literally! This package adds some serious ✨ pizzazz ✨ to your numbers with smooth, eye-catching animations.

## Features

- 🪶 **Less than 0kb:** It's so lightweight, it might just disappear! (But it won't, we promise.)
- 🛡️ **Zero Dependencies:** No baggage, no problems. Just pure spinning goodness.
- 🦴 **Headless:** You bring the style, react-spinning-numbers brings the spin.
- 🎨 **Cool Animation:** Transform your digits into mesmerizing spinners.

## Installation

Getting started is a breeze! Just install via your favorite package manager:

```bash
npm install react-spinning-numbers
yarn add react-spinning-numbers
pnpm add react-spinning-numbers
bun add react-spinning-numbers
```

Want to see those numbers spin? Let's dive in! 🌀

```javascript
import React, { useState } from "react";
import SpinningNumbers from "react-spinning-numbers";

export default function Component() {
  const [value, setValue] = useState(1);

  return (
    <div>
      <SpinningNumbers>{value}</SpinningNumbers>
      <button onClick={() => setValue(value + 1)}>Increase</button>
    </div>
  );
}
```

## Configuration

Here’s the magic sauce behind `SpinningNumbers`:

| Property    | Required | Type               | Default | Description                                                                        |
| ----------- | -------- | ------------------ | ------- | ---------------------------------------------------------------------------------- |
| `children`  | ✅       | `string \| number` | -       | The number or string to spin.                                                      |
| `fontSize`  | ✅       | `number`           | -       | Sets the font size for the spinning numbers.                                       |
| `className` | ❌       | `string`           | -       | Adds a custom class for additional styling.                                        |
| `style`     | ❌       | `CSSProperties`    | -       | Custom inline styles, excluding `lineHeight`, `fontSize`, `margin`, and `padding`. |
| `duration`  | ❌       | `number`           | `300`   | Controls the duration of the each digits spin animation, in milliseconds.          |
| `stagger`   | ❌       | `number`           | `100`   | Adds a stagger effect to the spin animation, in milliseconds.                      |
