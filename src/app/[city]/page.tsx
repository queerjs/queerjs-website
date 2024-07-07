"use client";

import React from "react";
import SEO from "../_components/seo";
import Layout from "../_components/layout";
import Sponsors from "../_components/Sponsors";
import Info from "../_components/Info";
import Speakers from "../_components/Speakers";
import Organizers from "../_components/Organizers";
import Attendees from "../_components/Attendees";
import Thanks from "../_components/Thanks";
import Panel from "../_components/Panel";
import Heading from "../_components/Heading";
import Announcement from "../_components/Announcement";
import { api } from "../../trpc/react";

const Main = () => {
  const meetup = api.meetup.getMeetup.useQuery({
    slug: "london-2024",
  });
  if (!meetup.data) return null;

  const hasHeading = !meetup.data.fullDescription
    ? {
        heading: "What?",
      }
    : {};
  console.log(meetup.data);
  const cityOrganizers = meetup.data.organizers;
  return (
    <Layout>
      <SEO
        title={`QueerJS - ${meetup.data.city}`}
        description={
          "A meetup for everyone where Queer Speakers take the stage"
        }
      />
      <section>
        <Heading sub="queerjs @">{meetup.data.city}</Heading>
        {meetup.data.announcement && (
          <Announcement
            message={
              meetup.data.announcement as {
                heading: string;
                text: string;
              }
            }
          />
        )}
        <Info attendeesNumber={meetup.data.attendees.length} {...meetup.data} />

        <Panel {...hasHeading}>
          {meetup.data.customDescription ? (
            <div
              className="custom-desc"
              dangerouslySetInnerHTML={{
                __html: meetup.data.customDescription,
              }}
            />
          ) : (
            <p>
              QueerJS is a meetup series where everyone is encouraged to attend
              and support the speakers and the idea.
              <br />
              If you're queer and want to speak this meetup is for you! It
              exists to give you a voice and to make a safe space where everyone
              is welcome.
            </p>
          )}
          <p>
            Join us! There will be {meetup.data.food ? "food and" : ""} stickers{" "}
            <span role="img" aria-label="Queer Rainbow">
              🌈
            </span>
          </p>
        </Panel>
        {meetup.data.speakers?.length || meetup.data.cfp ? (
          <Panel heading="Speakers">
            <Speakers
              cfp={meetup.data.cfp as boolean}
              speakers={meetup.data.speakers?.filter((s) => !s.MC) || []}
            />
          </Panel>
        ) : null}
        {meetup.data.speakers?.filter((s) => s.MC).length ? (
          <Panel heading="MC">
            <Speakers
              noSpeak
              cfp={meetup.data.cfp as boolean}
              speakers={meetup.data.speakers.filter((s) => s.MC)}
            />
          </Panel>
        ) : null}
        <Panel heading={`Attendees (${meetup.data.attendees.length})`}>
          <Attendees attendees={meetup.data.attendees} />
        </Panel>
        {/* {sponsors && (
          <Panel heading="Sponsors">
            <Sponsors sponsors={sponsors} />
          </Panel>
        )} */}

        {cityOrganizers?.length ? (
          <Panel
            heading={cityOrganizers?.length > 1 ? "Organizers" : "Organizer"}
          >
            <Organizers organizers={cityOrganizers} />
          </Panel>
        ) : null}
      </section>

      {/* <Panel heading={thanks && thanks.length ? "Special Thanks" : null}>
        <Thanks thanks={thanks || []} />
      </Panel> */}
    </Layout>
  );
};

export default Main;
