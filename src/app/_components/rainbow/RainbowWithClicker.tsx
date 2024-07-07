"use client";

import React from "react";
import Rainbow from "./Rainbow";
import { useRainbow } from "../../hooks/useRainbow";

type Props = {
  className?: string;
  flag?: string;
  stripes: string[];
  styles: CSSStyleDeclaration;
};

const RainbowWithClicker = ({ className, flag, ...props }: Props) => {
  const [stripes, { cycle }] = useRainbow();
  return (
    <Rainbow
      {...props}
      stripes={flag || stripes}
      style={{ ...props.styles, cursor: "pointer" }}
      className={className}
      onClick={() => !flag && cycle()}
    />
  );
};

export default RainbowWithClicker;
