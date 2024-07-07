import React from "react";
import RainbowWithClicker from "../rainbow/RainbowWithClicker";

import {
  InlineRainbow,
  SpeakerPhoto,
  CFP,
  CFPInner,
  SpeakersGrid,
  Unstyled,
  ListItem,
  UnstyledLink,
} from "./elements";
import { speakers } from "@prisma/client";

type Props = {
  noSpeak?: boolean;
  cfp: boolean;
  speakers: speakers[];
};

const Speakers = ({ noSpeak, speakers, cfp }: Props) => {
  return (
    <SpeakersGrid>
      {speakers?.map((human) => {
        const Wrapper = human.link ? UnstyledLink : "div";
        return (
          <ListItem
            talk={human.talk}
            key={human.xata_id}
            data-tooltip={`I'm speaking about ${human.talk}!`}
          >
            <Wrapper
              as="a"
              href={human.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              title={human.name}
            >
              <SpeakerPhoto>
                {human.github ? (
                  <>
                    <InlineRainbow />
                    <img
                      width={240}
                      height={240}
                      src={`https://github.com/${human.github}.png`}
                      alt="Speaker"
                    />
                  </>
                ) : (
                  <RainbowWithClicker
                    styles={{
                      width: 240,
                      height: 240,
                    }}
                  />
                )}
              </SpeakerPhoto>
              <Unstyled>{human.name}</Unstyled>
              {human.location && <Unstyled>{human.location}</Unstyled>}
            </Wrapper>
          </ListItem>
        );
      })}
      {cfp && !noSpeak && (
        <li>
          <UnstyledLink href="/speak" title="Speak at QueerJS">
            <SpeakerPhoto>
              <RainbowWithClicker>
                <CFP>
                  <CFPInner>
                    <h2>You?</h2> <span>Speak at QueerJS</span>
                  </CFPInner>
                </CFP>
              </RainbowWithClicker>
            </SpeakerPhoto>
          </UnstyledLink>
        </li>
      )}
    </SpeakersGrid>
  );
};

export default Speakers;
