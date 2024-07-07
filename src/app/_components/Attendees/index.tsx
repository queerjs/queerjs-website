import React from "react";

import { Attendees } from "./elements";
import { shuffle } from "../../utils/shuffle";
import { attendees } from "@prisma/client";

const dedupeAttendees = (attendeesArray: attendees[]) => {
  const list: any[] = [];
  const deduped = attendeesArray.reduce((acc, current) => {
    const cleanGhLink =
      current.ghLink && current.ghLink.startsWith("@")
        ? current.ghLink.slice(1)
        : current.ghLink;

    if (list.includes(cleanGhLink)) {
      return acc;
    }

    list.push(cleanGhLink);
    acc.push(current);

    return acc;
  }, [] as attendees[]);

  return deduped;
};

type Props = {
  attendees: attendees[];
};

const AttendeesComponent = ({ attendees }: Props) => {
  const dedupedAttendees = dedupeAttendees(attendees);

  return (
    <Attendees>
      {shuffle(dedupedAttendees).map(({ data: a }) => {
        // Pretty ugly but this way we do not get duplicate https://github.com urls

        const cleanGhLink =
          a.ghLink && a.ghLink.startsWith("@")
            ? a.ghLink.slice(1)
            : a.ghLink || "queerjs";

        const ghLink = `https://github.com/${cleanGhLink.trim().replace("https://github.com/", "")}`;
        return (
          <li key={a.ghLink}>
            <a
              href={ghLink}
              target="_blank"
              title={a.name}
              rel="noopener noreferrer"
            >
              <img src={`${ghLink}.png?size=50`} alt={a.name} width="50" />
            </a>
          </li>
        );
      })}
    </Attendees>
  );
};

export default AttendeesComponent;
