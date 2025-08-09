'use server';

import { AccessToken, createAccessRefreshPair } from 'simple-web-tokens';
import { prisma } from './prisma';
import * as bcrypt from 'bcrypt';

const PKEY = process.env.SECRET || 'key';

export async function getUserFromAccessToken(accessToken: string) {
    try {
        const at = await AccessToken.parse(accessToken, PKEY);

        if (!at || !at.userId) return null;

        const user = await prisma.user.findUnique({
            where: {
                id: at.userId,
            },
        });

        return user;
    } catch (e) {
        return null;
    }
}

export async function login(username: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (!user) return null;

    const hash = await bcrypt.hash(password, user.passwordSalt);
    if (hash !== user.passwordHash) return null;

    const [accessToken, _] = await createAccessRefreshPair(user.id, PKEY);

    return accessToken;
}

export async function register(username: string, password: string) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (username.length < 3)
        return { accessToken: null, error: 'Username must be at least 3 characters' };
    if (username.length > 16)
        return { accessToken: null, error: 'Username cannot be more than 16 characters' };
    if (!usernameRegex.test(username)) return { accessToken: null, error: 'Invalid username' };

    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+~-]{8,128}$/;
    if (password.length < 8)
        return { accessToken: null, error: 'Password must be at least 8 characters' };
    if (password.length > 128)
        return { accessToken: null, error: 'Password cannot be more than 128 characters' };
    if (!passwordRegex.test(password)) return { accessToken: null, error: 'Invalid password' };

    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (user) return { accessToken: null, error: 'Username already taken' };

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
        data: {
            username,
            passwordSalt: salt,
            passwordHash: hash,
        },
    });

    const [accessToken, _] = await createAccessRefreshPair(newUser.id, PKEY);

    return { accessToken, error: null };
}

export interface PublicUser {
    id: number;
    username: string;
}

export async function getPublicUser(accessToken: string, userId: number) {
    const myUser = await getUserFromAccessToken(accessToken);
    if (!myUser) return null;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            username: true,
        },
    });

    return user;
}
