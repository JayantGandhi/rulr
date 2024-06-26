import { createTRPCRouter } from '@/server/trpc';
import { userRouter } from '@/server/routers/user';



export const appRouter = createTRPCRouter({
    user: userRouter,

});

export type AppRouter = typeof appRouter;