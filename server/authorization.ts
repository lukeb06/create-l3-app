import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Context as C } from 'hono';

export async function createContext(__opts: FetchCreateContextFnOptions | undefined, c: C) {
    async function getUserFromHeader() {
        return null;
    }

    const user = await getUserFromHeader();

    return { user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
