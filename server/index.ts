import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { router } from './trpc';
import { createServer } from 'node:http';

import { procedures } from './procedures';

const appRouter = router(procedures);

export type AppRouter = typeof appRouter;

const handler = createHTTPHandler({
	router: appRouter,
	createContext() {
		return {};
	},
});

const server = createServer((req: any, res: any) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');

	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		res.end();
		return;
	}

	handler(req, res);
});

server.listen(3001, () => {
	console.log('Server is running on port 3001');
});
