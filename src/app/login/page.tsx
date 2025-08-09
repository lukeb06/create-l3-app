'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/actions';
import { useCookies } from 'next-client-cookies';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { useState } from 'react';

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
        login(username, password).then(accessToken => {
            setLoading(false);
            if (!accessToken) return alert('Invalid username or password');
            cookies.set('token', accessToken);
            router.push('/');
        });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 h-full">
            <h1 style={{ viewTransitionName: 'h1-title' }} className="text-xl font-mono">
                create-l3-app
            </h1>
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
