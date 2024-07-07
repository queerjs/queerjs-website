"use client";
import React from "react";
import LogoImg from "./logo";
import Link from "next/link";
import styled, { css } from "styled-components";

export const Nav = styled.nav`
  padding: 3em 0 1.5em;
  @media screen and (max-width: 38em) {
    padding: 0.5em 0 0;
  }
`;

export const NavRow = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row-reverse;
  @media screen and (max-width: 38em) {
    flex-direction: column;
  }
  ul,
  li {
    display: inline;
    margin: 0;
    padding: 0;
  }
  ul {
    @media screen and (max-width: 38em) {
      margin-top: 2rem;
    }
  }
`;

export const Logo = styled(LogoImg)`
  height: 50px;
  min-width: 50px;
  float: left;
`;

export const LogoWrap = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const link = css`
  font-family: ${(props) => props.theme.neutra};
  font-size: 1.6rem;
  float: left;
  text-decoration: underline;
  margin-right: 1em;
  @media screen and (max-width: 38em) {
    display: block;
    margin-bottom: 0.5em;
    width: 100%;
  }
  &:hover {
    transform: scale(1.05) rotate(-1.5deg);
  }
`;

export const NavHref = styled.a`
  ${link}
`;

export const NavLink = styled(Link)`
  ${link}
`;

export const Title = styled.h1`
  display: block;
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
  font-size: 2px;
`;

export const Subtitle = styled.h2`
  font-size: 0.8rem;
  color: ${(props) => props.theme.lightPurple};
  margin: 0;
  font-weight: 400;
  @media screen and (max-width: 38em) {
    display: none;
  }
`;

export const CodelingsOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: -1;
  max-width: 100%;
  overflow: hidden;
`;
export const CodelingsInner = styled.div`
  font-family: ${(props) => props.theme.neutra};
  color: ${(props) => props.theme.contrastPurple};
  font-size: 6rem;
  letter-spacing: 0.75em;
  transform: rotate(-3deg);
  position: relative;
  left: -25vw;
  top: -1em;
  right: -25vw;
  width: 150vw;
  line-height: 1em;
  height: 3em;
  overflow: hidden;
  text-align: right;
`;
