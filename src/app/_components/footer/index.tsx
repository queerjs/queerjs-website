import React from "react";
import Link from "next/link";
import { FooterWrap } from "./elements";

const Footer = () => {
  return (
    <FooterWrap>
      We have a <Link href="/code-of-conduct"> Code of Conduct</Link>
      .
      <br />
      <Link href="/flags">What's with all the flags?</Link>
      <br />
      Follow QueerJS on{" "}
      <a href="https://twitter.com/queerjs" title="Follow us on Twitter">
        Twitter
      </a>
      <br />
      <br />
    </FooterWrap>
  );
};

export default Footer;
