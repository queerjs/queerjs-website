import React, { useState } from 'react'
import { format, isPast } from 'date-fns'

import Rsvp from './Form'
import Flag from '../icons/flag'
import Calendar from '../icons/calendar'

import { Info, RsvpButton, Blinker, Bouncer } from './elements'

const InfoComponent = ({ site, city, info, attendeesNumber }) => {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const closeRSVP =
    (info.maxCapacity && attendeesNumber >= info.maxCapacity) ||
    info.rsvpsClosed ||
    isPast(new Date(info.date))

  return (
    <>
      <Info>
        <Flag />
        <span>
          Location:{' '}
          <a href={site.googleMapsLink} target="_blank" title="Location" rel="noopener noreferrer">
            {site.location}
          </a>
        </span>
        <span>
          {info.bySeason ? (
            <p>{info.bySeason}</p>
          ) : (
            <a href={site.calendarLink} title="Add to Calendar">
              {info.hour} {format(new Date(info.date), ["do 'of' MMMM"])}
            </a>
          )}
        </span>
        <Calendar />
      </Info>
      {!open ? (
        <RsvpButton
          onClick={() => (!site.rsvpLink ? setOpen(true) : () => {})}
          style={
            submitted || closeRSVP
              ? {
                  pointerEvents: 'none'
                }
              : {}
          }
        >
          {!closeRSVP ? (
            <>
              <Blinker delay={0}>{'>'}</Blinker>
              <Blinker delay={1}>{'>'}</Blinker>
              <Blinker delay={2}>{'>'}</Blinker>
              <Blinker delay={3}>{'>'}</Blinker>{' '}
              {site.rsvpLink && (
                <Bouncer>
                  <a target="_blank" rel="noopener noreferrer" href={site.rsvpLink}>
                    RSVP NOW
                  </a>
                </Bouncer>
              )}
              {!site.rsvpLink && !submitted ? <Bouncer>RSVP NOW</Bouncer> : null}{' '}
              {!site.rsvpLink && submitted ? <Bouncer>YOU ARE AWESOME</Bouncer> : null}
              <Blinker delay={3}>{'<'}</Blinker>
              <Blinker delay={2}>{'<'}</Blinker>
              <Blinker delay={1}>{'<'}</Blinker>
              <Blinker delay={0}>{'<'}</Blinker>
            </>
          ) : (
            'RSVPs are now closed'
          )}
        </RsvpButton>
      ) : (
        <Rsvp
          city={city}
          onSubmit={() => {
            setOpen(false)
            setSubmitted(true)
          }}
        />
      )}
    </>
  )
}

export default InfoComponent
