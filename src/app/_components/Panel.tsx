import React from "react";
import styled, { css } from "styled-components";

const heading = css`
  font-size: 32px;
  font-family: "NeutraText-Bold";
  margin: 20px 0;
  display: block;
`;
const PanelSection = styled.section<{ wide: boolean }>`
  margin: 5em 0 1.5em;
  ${(props) =>
    props.wide === false &&
    css`
      max-width: 50em;
    `}

  h2 {
    ${heading}
  }
`;

const Permalink = styled.a`
  position: absolute;
  font-size: 0.75em;
  text-decoration: none;
  transition: all 0.1s;
  display: inline-block;
  padding: 1em;
  margin: -1em 0 0 -2.5em;
`;

const Heading = styled.h2`
  ${heading}

  & ${Permalink} {
    opacity: 0;
  }
  &:hover ${Permalink} {
    opacity: 1;
  }
`;

type Props = {
  heading?: string;
  id?: string;
  wide?: boolean;
  children?: React.ReactNode;
};

const Panel = ({ heading, children, id, wide = false }: Props) => (
  <PanelSection wide={wide} id={id}>
    {heading && (
      <Heading>
        {id && (
          <Permalink href={`#${id}`} aria-label="Copy link">
            📎
          </Permalink>
        )}
        {heading}
      </Heading>
    )}
    {children}
  </PanelSection>
);

export const LargeParagraph = styled.p`
  font-size: 1.25em;
  color: ${(props) => props.theme.lightPurple};
`;

export default Panel;
