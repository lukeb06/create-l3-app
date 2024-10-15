import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './../../server/index';

export const SERVER = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `http://localhost:3001`,
		}),
	],
});
