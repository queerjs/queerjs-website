import { omit } from "lodash-es";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const meetupRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.meetups.findMany({
      orderBy: { xata_createdat: "desc" },
      include: {
        meetup_hosts: {
          include: {
            hosts: true,
          },
        },
      },
    });

    return data.map((d) => ({
      ...omit(d, "meetup_hosts"),
      host: d.meetup_hosts[0]?.hosts,
    }));
  }),
  getMeetup: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.meetups.findFirst({
        orderBy: { xata_createdat: "desc" },
        where: {
          slug: input.slug,
        },
        include: {
          meetup_hosts: {
            include: {
              hosts: true,
            },
          },
          meetup_speakers: {
            include: {
              speakers: true,
            },
          },
          meetup_organziers: {
            include: {
              organizers: true,
            },
          },
        },
      });

      const attendees = await ctx.db.attendees.findMany({
        where: {
          city: input.slug,
        },
      });

      return {
        ...omit(data, ["meetup_hosts", "meetup_speakers", "meetup_organziers"]),
        hosts: data?.meetup_hosts.map((a) => a.hosts),
        speakers: data?.meetup_speakers.map((a) => a.speakers),
        organizers: data?.meetup_organziers.map((a) => a.organizers),
        attendees,
      };
    }),
});
