import React from "react";
import styled from "styled-components";

const ThanksList = styled.ul`
  list-style: none;
  color: ${(props) => props.theme.lightGrey};
  font-size: 0.8em;
  margin: 20px 0 40px;

  li {
    margin-bottom: 10px;
  }
`;

const Thanks = ({ thanks }) => (
  <>
    <ThanksList>
      {thanks.map((a) => (
        <li key={a.id}>
          <a
            href={a.link}
            title={a.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            {a.name} for {a.reason}
          </a>
        </li>
      ))}
    </ThanksList>
  </>
);

export default Thanks;
