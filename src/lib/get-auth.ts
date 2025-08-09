'use server';

import { getCookies } from 'next-client-cookies/server';
import { getUserFromAccessToken } from './actions';

export async function getAuth() {
    const cookies = await getCookies();
    const token = cookies.get('token') || null;
    const user = token ? await getUserFromAccessToken(token) : null;

    return { token, user };
}
