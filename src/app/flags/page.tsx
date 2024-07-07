"use client";

import React from "react";
import SEO from "../_components/seo";
import Layout from "../_components/layout";
import Panel from "../_components/Panel";
import Rainbow from "../_components/rainbow/Rainbow";

import styled from "styled-components";
import Thanks from "../_components/Thanks";
import { allStripes } from "../hooks/useRainbow";

const Flag = styled(Rainbow)<{ stripes: any }>`
  width: 6em;
  height: 4em;
  border: 2px solid black;
  transform: rotate(-5deg);
  margin-bottom: 1em;
`;

const Box = styled.a`
  display: block;
  border: 3px solid ${(props) => props.theme.contrastPurple};
  justify-content: center;
  margin-bottom: -3px;
  padding: 1em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1em;
  font-weight: inherit;
  margin: 0;
`;

const Flags = () => {
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
        <Panel heading="All the flags">
          <ul className="grid gap-4 sm:grid-cols-2">
            {allStripes.map((stripe, i) => (
              <Box
                key={i}
                href={stripe.wiki}
                target="_blank"
                title={stripe.name}
              >
                <Flag stripes={stripe.stripes} />
                <Title>{stripe.name}</Title>
              </Box>
            ))}
          </ul>
        </Panel>
      </main>
      <Thanks
        thanks={[
          {
            link: "https://www.flaticon.com",
            name: "Thank you to flaticon",
            reason: "icons",
          },
        ]}
      />
    </Layout>
  );
};

export default Flags;
