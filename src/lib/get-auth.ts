'use server';

import { getCookies } from 'next-client-cookies/server';
import { getUserFromAccessToken } from './actions';

export async function getAuth() {
    const cookies = await getCookies();
    const accessToken = cookies.get('token') || null;
    const refreshToken = cookies.get('refresh') || null;
    const authData =
        accessToken && refreshToken
            ? await getUserFromAccessToken({ accessToken, refreshToken })
            : null;
    const user = authData?.user || null;

    return { accessToken, user, refreshToken };
}
