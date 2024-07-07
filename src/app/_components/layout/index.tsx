import React from "react";
import Header from "../header";
import { ThemeProvider } from "styled-components";
import { theme, Global, Wrapper, SubWrapper, SideRainbow } from "./elements";
import Footer from "../footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <ThemeProvider theme={theme as any}>
    <>
      <SideRainbow />
      <Global />
      <Wrapper>
        <Header />
        <SubWrapper>{children}</SubWrapper>
        <Footer />
      </Wrapper>
    </>
  </ThemeProvider>
);

export default Layout;
