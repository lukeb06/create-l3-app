import { publicProcedure } from './trpc';
import { z } from 'zod';

const status = publicProcedure.query(async () => {
    return { status: 'Hello, Next.js!' };
});

const echoInput = z.object({
    message: z.string()
});
const echo = publicProcedure.input(echoInput).query(async ({ input }) => {
    return { message: input.message };
});

export const procedures = { status, echo };
