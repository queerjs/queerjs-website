import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const attendeesRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        city: z.string().min(1),
        name: z.string().min(1),
        ghLink: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.attendees.create({
        data: {
          name: input.name,
          ghLink: input.ghLink,
          city: input.city,
        },
      });
    }),
});
