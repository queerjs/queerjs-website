"use client";

import React from "react";
import SEO from "../_components/seo";
import Layout from "../_components/layout";

import Panel from "../_components/Panel";
import Speakers from "../_components/Speakers";

import organizers from "./people";
import Link from "next/link";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const OrganizersPage = () => {
  const { site } = {
    site: {
      title: "QueerJS",
      description: "A meetup for everyone where Queer Speakers take the stage",
    },
  };
  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
        <Panel heading="Organizers">
          <p>
            Nothing can be organized by only one person - there is a team
            helping QueerJS be a safe space all over the world.
          </p>
          <p>
            The cities indicate what events they helped organize. Want to help
            organize a meetup in your own city? See some of the ways you can{" "}
            <Link href="/getting-involved"> get involved</Link>.
          </p>
          <p className="mb-10">Thank you.</p>
          {Object.keys(organizers).map((location) => {
            return (
              <>
                <h2 className="mb-5">{capitalize(location)}</h2>
                <Speakers cfp={false} speakers={organizers[location]} />
              </>
            );
          })}
        </Panel>
      </main>
    </Layout>
  );
};

export default OrganizersPage;
