'use client';

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './../../server/index';

const SERVER_IP = 'http://localhost:3001';

let headers = {};

const CREATE_SERVER = () => {
    const client = createTRPCClient<AppRouter>({
        links: [
            httpBatchLink({
                url: SERVER_IP + '/trpc',
                headers() {
                    return headers;
                },
            }),
        ],
    });

    return client;
};

const SERVER = CREATE_SERVER();

export const setHeaders = (_headers: {}) => {
    headers = _headers;
};

type Server = typeof SERVER;

export const useAPI = (): Server => {
    return SERVER;
};
