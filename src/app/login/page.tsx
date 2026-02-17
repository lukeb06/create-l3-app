'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TITLE } from '@/data/static';
import { login } from '@/lib/actions';
import { useCookies } from 'next-client-cookies';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { useState } from 'react';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const FIFTEEN_MINUTES = 15 * ONE_MINUTE;
const ONE_HOUR = 4 * FIFTEEN_MINUTES;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_QUARTER = ONE_MONTH * 3;

const dev = process.env.NODE_ENV === 'development';

export default function LoginPage() {
    const cookies = useCookies();
    const router = useTransitionRouter();

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);

        const username = (data.get('username') as string) || '';
        const password = (data.get('password') as string) || '';

        setLoading(true);
        login(username, password).then(([accessToken, refreshToken]) => {
            setLoading(false);
            if (!accessToken) return alert('Invalid username or password');
            if (!refreshToken) return alert('Something went wrong. Please try again.');
            cookies.set('token', accessToken, { secure: !dev, sameSite: 'strict' });
            cookies.set('refresh', refreshToken, { secure: !dev, sameSite: 'strict' });
            router.push('/');
        });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 h-full">
            <Link href="/">
                <h1 style={{ viewTransitionName: 'h1-title' }} className="text-xl font-mono">
                    {TITLE}
                </h1>
            </Link>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div style={{ viewTransitionName: 'username-input' }}>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" type="text" />
                </div>

                <div style={{ viewTransitionName: 'password-input' }}>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" />
                </div>

                <Button
                    disabled={loading}
                    style={{ viewTransitionName: 'login-form-button' }}
                    type="submit"
                >
                    Login
                </Button>

                <p style={{ viewTransitionName: 'login-form-anchor' }}>
                    Don't have an account? <Link href="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}
