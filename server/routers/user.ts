import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/trpc";

export const userRouter = createTRPCRouter({
    get: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.user.findUnique({
                where: { id: input.id },
            });
        }),
})
