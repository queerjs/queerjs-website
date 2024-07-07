import React, { useState } from "react";
import Helmet from "react-helmet";

import {
  Wrapper,
  CityInfo,
  CityIcon,
  Cities,
  Name,
  MeetupDate,
  Host,
} from "./elements";
import { hosts } from "@prisma/client";

type XataImage = {
  name: string;
  size: number;
  version: number;
  mediaType: string;
  uploadKey: string;
  storageKey: string;
  enablePublicUrl: boolean;
  signedUrlTimeout: number;
  uploadUrlTimeout: number;
};

interface CityProps {
  past: boolean;
  city: string;
  slug: string;
  date: string;
  bySeason: string;
  icon: XataImage;
  icon_hover: XataImage;
  host: hosts & {
    media: XataImage;
  };
}

const City = ({
  past,
  city,
  slug,
  date,
  bySeason,
  icon,
  icon_hover,
  host,
}: CityProps) => {
  const [hover, setHover] = useState(false);
  const url = `https://eu-west-1.storage.xata.sh/`;
  return (
    <Wrapper
      itemScope
      itemType="http://schema.org/Event"
      title={`QueerJS ${city}`}
      href={`/${slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CityIcon>
        {hover && !past ? (
          <img
            src={url + icon_hover.storageKey}
            className="animated bounceIn"
            alt={city}
          />
        ) : (
          <img src={url + icon.storageKey} alt={city} />
        )}
        {!past && (
          <Helmet>
            <link rel="preload" href={url + icon_hover.storageKey} as="image" />
          </Helmet>
        )}
      </CityIcon>
      <CityInfo>
        <MeetupDate itemprop={date} content={date} past={past}>
          {bySeason ? (
            <span>{bySeason}</span>
          ) : (
            new Date(date).toLocaleDateString()
          )}
        </MeetupDate>
        <Name past={past} itemprop="name">
          {city}
        </Name>
        {host.media && (
          <Host
            past={past}
            src={url + host.media.storageKey}
            alt={host.name || ""}
          />
        )}
      </CityInfo>
    </Wrapper>
  );
};

export default City;

export { Cities };
