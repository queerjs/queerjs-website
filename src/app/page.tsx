"use client";

import { isFuture, isToday } from "date-fns";
import { api } from "~/trpc/react";
import Layout from "./_components/layout";
import SEO from "./_components/seo";
import Panel, { LargeParagraph } from "./_components/Panel";
import City, { Cities } from "./_components/City";

export default function Home() {
  const meetups = api.meetup.getAll.useQuery();
  if (!meetups.data) return null;
  const sortedCities = meetups.data
    .sort(
      (a, b) =>
        new Date(a.xata_createdat).getTime() -
        new Date(b.xata_createdat).getTime(),
    )
    .reverse();
  const futureMeetups = sortedCities.filter(
    (city) =>
      isFuture(new Date(city.date as Date)) ||
      isToday(new Date(city.date as Date)),
  );
  const pastMeetups = sortedCities.filter(
    (city) =>
      !isFuture(new Date(city.date as Date)) &&
      !isToday(new Date(city.date as Date)),
  );

  return (
    <Layout>
      <SEO
        title={"QueerJS"}
        description={
          "A meetup for everyone where Queer Speakers take the stage"
        }
      />
      <Panel>
        <LargeParagraph>
          QueerJS is a meetup series where everyone is encouraged to attend and
          support the speakers and the idea.
          <br />
          <br />
          If you're queer and want to speak this meetup is for you! It exists to
          give you a voice and to make a safe space where everyone is welcome.
        </LargeParagraph>
        <LargeParagraph>
          Join us! There will be food and stickers{" "}
          <span role="img" aria-label="Queer Rainbow">
            🌈
          </span>
        </LargeParagraph>
      </Panel>
      {futureMeetups.length ? (
        <Panel wide heading="Upcoming meetups">
          <Cities>
            {futureMeetups.map((node) => (
              <City {...node} key={node.xata_id} />
            ))}
          </Cities>
        </Panel>
      ) : null}
      {pastMeetups.length ? (
        <Panel wide heading="Past Meetups">
          <Cities>
            {pastMeetups.map((node) => (
              <City {...node} past key={node.xata_id} />
            ))}
          </Cities>
        </Panel>
      ) : null}
    </Layout>
  );
}
