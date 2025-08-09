'use client';

import { getUserFromAccessToken } from '@/lib/actions';
import type { User } from 'generated/prisma';
import { useCookies } from 'next-client-cookies';
import { useState, useEffect } from 'react';

export function useAuth() {
    const cookies = useCookies();
    const token = cookies.get('token') || null;
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!token) return;

        getUserFromAccessToken(token).then(user => {
            setUser(user);
        });
    }, [token]);

    return { user, token };
}
