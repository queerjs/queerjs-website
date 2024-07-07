import { omit } from "lodash-es";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const meetupRouter = createTRPCRouter({
  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),

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
});
