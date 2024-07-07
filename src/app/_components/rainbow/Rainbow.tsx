import React from "react";
import { Stripe, SubWrapper, Wrapper } from "./elements";

type Props = {
  className?: string;
  flag?: string;
  stripes: any;
  children: React.ReactNode;
};

const Rainbow = ({ stripes, children, ...other }: Props) => {
  const max = 10;
  const streeps = new Array(max).fill(undefined);

  return (
    <Wrapper {...other}>
      <SubWrapper>
        {streeps.map((_, i) => {
          const { color, size } = stripes[i] || { color: "black", size: 0 };
          return <Stripe key={i} color={color} size={size} />;
        })}
      </SubWrapper>
      {children}
    </Wrapper>
  );
};

export default Rainbow;