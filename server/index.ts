import { router } from './trpc';
import { createContext } from './authorization';

import { procedures } from './procedures';

import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';

const appRouter = router(procedures);

export type AppRouter = typeof appRouter;

const app = new Hono();

app.use('*', async (c, next) => {
    c.res.headers.set('Access-Control-Allow-Origin', '*');
    c.res.headers.set('Access-Control-Request-Method', '*');
    c.res.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    c.res.headers.set('Access-Control-Allow-Headers', '*');
    c.res.headers.set('Access-Control-Allow-Credentials', 'true');

    if (c.req.method === 'OPTIONS') {
        return c.text('', 200);
    }

    await next();
});

app.use('/trpc/*', trpcServer({ router: appRouter, createContext }));

export default app;
