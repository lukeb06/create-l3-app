import { publicProcedure } from './trpc';
import { z } from 'zod';

const status = publicProcedure.query(async () => {
	return { status: 'Hello, Next.js!' };
});

export const procedures = { status };
