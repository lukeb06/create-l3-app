'use client';

import { getUserFromAccessToken } from '@/lib/actions';
import type { User } from 'generated/prisma';
import { useCookies } from 'next-client-cookies';
import { useState, useEffect } from 'react';

export function useAuth() {
    const cookies = useCookies();
    const [accessToken, setAccessToken] = useState(cookies.get('token') || null);
    const [refreshToken, setRefreshToken] = useState(cookies.get('refresh') || null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!accessToken) return;
        if (!refreshToken) return;

        getUserFromAccessToken({ accessToken, refreshToken }).then(
            ({ user, newAccessToken, newRefreshToken }) => {
                if (newAccessToken) setAccessToken(newAccessToken);
                if (newRefreshToken) setRefreshToken(newRefreshToken);
                setUser(user);
            },
        );
    }, []);

    useEffect(() => {
        if (!accessToken) return;
        if (!refreshToken) return;

        cookies.set('token', accessToken);
        cookies.set('refresh', refreshToken);
    }, [accessToken, refreshToken]);

    return { user, accessToken, refreshToken };
}
