import React from "react";

import TextLogo from "./text";
import RainbowWithClicker from "../rainbow/RainbowWithClicker";
import {
  Nav,
  LogoWrap,
  Logo,
  Subtitle,
  NavRow,
  NavLink,
  NavHref,
  Title,
  CodelingsOuter,
  CodelingsInner,
} from "./elements";

const Codelings = () => (
  <CodelingsOuter aria-hidden>
    <CodelingsInner>{`~=~>&&<{=$%~%~= >}>[][ ]~=~>&&~ =~>& &<{==>}  ><{  =$$%  ~ =>  }  >[ ]`}</CodelingsInner>
  </CodelingsOuter>
);

const Header = () => (
  <Nav>
    <Codelings />
    <Title>QueerJS</Title>
    <Subtitle>
      A meetup for everyone where Queer Speakers take the stage
    </Subtitle>
    <NavRow>
      <LogoWrap>
        <TextLogo />
        <RainbowWithClicker stripes={["red"]}>
          <Logo />
        </RainbowWithClicker>
      </LogoWrap>

      <ul>
        <li>
          <NavLink href="/">Meetups</NavLink>
        </li>
        <li>
          <NavHref
            href="https://opencollective.com/queerjs"
            target="_blank"
            title="Donate to QueerJS"
            rel="noopener noreferrer"
          >
            Donate
          </NavHref>
        </li>
        <li>
          <NavLink href="/organizers">Organizers</NavLink>
        </li>
        <li>
          <NavLink href="/faq">FAQ</NavLink>
        </li>
        <li>
          <NavHref href="/discord">Discord</NavHref>
        </li>
      </ul>
    </NavRow>
  </Nav>
);

export default Header;
