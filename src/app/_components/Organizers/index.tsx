import React from "react";

import {
  InlineRainbow,
  OrganizerPhoto,
  OrganizersGrid,
  Unstyled,
  ListItem,
  UnstyledLink,
} from "./elements";
import { organizers } from "@prisma/client";

const size = 100;

const humanHref = (human: organizers) => {
  if (human.github) {
    return `https://github.com/${human.github}`;
  }
  if (human.twitter) {
    return `https://twitter.com/${human.twitter}`;
  }
};

const Organizers = ({
  organizers,
}: {
  organizers: (organizers & { colors?: string[] })[];
}) => {
  return (
    <OrganizersGrid size={size}>
      {organizers.map((human) => (
        <ListItem key={human.name}>
          <UnstyledLink
            as="a"
            href={humanHref(human)}
            target="_blank"
            rel="noopener noreferrer"
            title={human.name}
          >
            <OrganizerPhoto size={size}>
              {human.colors ? (
                <InlineRainbow flag={human.colors} />
              ) : (
                <InlineRainbow />
              )}
              <img
                width={size + "px"}
                height={size + "px"}
                src={`https://github.com/${human.github}.png`}
                alt="Organizer"
              />
            </OrganizerPhoto>
            <Unstyled>{human.name}</Unstyled>
          </UnstyledLink>
        </ListItem>
      ))}
    </OrganizersGrid>
  );
};

export default Organizers;
