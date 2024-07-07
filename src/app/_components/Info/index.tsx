import React, { useState } from "react";
import { format, isPast } from "date-fns";

import Rsvp from "./Form";
import Flag from "../icons/flag";
import Calendar from "../icons/calendar";

import { Info, RsvpButton, Blinker, Bouncer } from "./elements";
import { meetups } from "@prisma/client";

type Props = meetups & {
  attendeesNumber: number;
};

const InfoComponent = ({
  attendeesNumber,
  maxCapacity,
  date,
  rsvpsClosed,
  googleMapsLink,
  locationName,
  bySeason,
  calendarLink,
  slug,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // const closeRSVP =
  //   (maxCapacity && attendeesNumber >= maxCapacity) ||
  //   rsvpsClosed ||
  //   isPast(new Date(date as any));

  const closeRSVP = false;

  return (
    <>
      <Info>
        <Flag />
        <span>
          Location:{" "}
          {googleMapsLink ? (
            <a
              href={googleMapsLink}
              target="_blank"
              title="Location"
              rel="noopener noreferrer"
            >
              {locationName}
            </a>
          ) : (
            locationName
          )}
        </span>
        <span>
          {bySeason ? (
            <p>{bySeason}</p>
          ) : (
            <a href={calendarLink as string} title="Add to Calendar">
              {format(new Date(date), "HH:mm")}{" "}
              {format(new Date(date), "do 'of' MMMM")}
            </a>
          )}
        </span>
        <Calendar />
      </Info>
      {!open ? (
        <RsvpButton
          onClick={() => setOpen(true)}
          style={
            submitted || closeRSVP
              ? {
                  pointerEvents: "none",
                }
              : {}
          }
        >
          {!closeRSVP ? (
            <>
              <Blinker delay={0}>{">"}</Blinker>
              <Blinker delay={1}>{">"}</Blinker>
              <Blinker delay={2}>{">"}</Blinker>
              <Blinker delay={3}>{">"}</Blinker>{" "}
              {!submitted ? <Bouncer>RSVP NOW</Bouncer> : null}{" "}
              {submitted ? <Bouncer>YOU ARE AWESOME</Bouncer> : null}
              <Blinker delay={3}>{"<"}</Blinker>
              <Blinker delay={2}>{"<"}</Blinker>
              <Blinker delay={1}>{"<"}</Blinker>
              <Blinker delay={0}>{"<"}</Blinker>
            </>
          ) : (
            "RSVPs are now closed"
          )}
        </RsvpButton>
      ) : (
        <Rsvp
          city={slug}
          onSubmit={() => {
            setOpen(false);
            setSubmitted(true);
          }}
        />
      )}
    </>
  );
};

export default InfoComponent;
