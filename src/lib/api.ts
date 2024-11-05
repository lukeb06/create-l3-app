'use server';

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './../../server/index';
import { cookies } from 'next/headers';

function getServerCookies() {
    let token = cookies().get('token')?.value || null;

    return token;
}

const SERVER_IP = 'http://localhost:3001';

export async function endpoint(path: string) {
    return `${SERVER_IP}/${path}`;
}

const SERVER = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: SERVER_IP + '/trpc',
            headers() {
                let token = getServerCookies();
                return token ? { Authorization: `Basic ${token}` } : {};
            }
        }),
    ],
});

export async function API() {
    return SERVER;
}
