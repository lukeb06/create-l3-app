'use server';

import { AccessToken, createAccessRefreshPair, RefreshToken } from 'simple-web-tokens';
import { prisma } from './prisma';
import * as bcrypt from 'bcrypt';
import type { User } from 'generated/prisma';
import { getCookies } from 'next-client-cookies/server';

const PKEY = process.env.SECRET || 'key';

export type AuthData = {
    accessToken: string;
    refreshToken: string;
};

export async function getUserFromAccessToken(authData: AuthData) {
    const { accessToken, refreshToken } = authData;

    let returnData: {
        user: User | null;
        newAccessToken: string | null;
        newRefreshToken: string | null;
    } = { user: null, newAccessToken: null, newRefreshToken: null };

    try {
        const at = AccessToken.parse(accessToken, PKEY);
        const rt = RefreshToken.parse(refreshToken, at, PKEY);

        if (at.expired) {
            if (rt.expired) return returnData;

            const [newAccessToken, newRefreshToken] = createAccessRefreshPair(at.userId, PKEY);

            returnData.newAccessToken = newAccessToken;
            returnData.newRefreshToken = newRefreshToken;

            try {
                const cookies = await getCookies();
                cookies.set('token', newAccessToken);
                cookies.set('refresh', newRefreshToken);
            } catch (e) {}
        }

        const user = await prisma.user.findUnique({
            where: {
                id: at.userId as string,
            },
        });

        returnData.user = user;

        return returnData;
    } catch (e) {
        console.log('error', e);
        return returnData;
    }
}

export async function login(
    username: string,
    password: string,
): Promise<[string | null, string | null]> {
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (!user) return [null, null];

    const hash = await bcrypt.hash(password, user.passwordSalt);
    if (hash !== user.passwordHash) return [null, null];

    const [accessToken, refreshToken] = createAccessRefreshPair(user.id, PKEY);

    return [accessToken, refreshToken];
}

export async function register(username: string, password: string) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (username.length < 3)
        return {
            accessToken: null,
            refreshToken: null,
            error: 'Username must be at least 3 characters',
        };
    if (username.length > 16)
        return {
            accessToken: null,
            refreshToken: null,
            error: 'Username cannot be more than 16 characters',
        };
    if (!usernameRegex.test(username))
        return { accessToken: null, refreshToken: null, error: 'Invalid username' };

    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+~-]{8,64}$/;
    if (password.length < 8)
        return {
            accessToken: null,
            refreshToken: null,
            error: 'Password must be at least 8 characters',
        };
    if (password.length > 64)
        return {
            accessToken: null,
            refreshToken: null,
            error: 'Password cannot be more than 64 characters',
        };
    if (!passwordRegex.test(password))
        return { accessToken: null, refreshToken: null, error: 'Invalid password' };

    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (user) return { accessToken: null, refreshToken: null, error: 'Username already taken' };

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
        data: {
            username,
            passwordSalt: salt,
            passwordHash: hash,
        },
    });

    const [accessToken, refreshToken] = createAccessRefreshPair(newUser.id, PKEY);

    return { accessToken, refreshToken, error: null };
}

export type PublicUser = Omit<User, 'passwordHash' | 'passwordSalt'>;

export async function getPublicUser(
    authData: AuthData,
    userId: string,
): Promise<PublicUser | null> {
    const { user: myUser } = await getUserFromAccessToken(authData);
    if (!myUser) return null;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        omit: {
            passwordHash: true,
            passwordSalt: true,
        },
    });

    return user;
}
