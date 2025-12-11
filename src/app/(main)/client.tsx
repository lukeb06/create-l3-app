'use client';

import { Button } from '@/components/ui/button';
import type { User } from 'generated/prisma';
import { Link } from 'next-view-transitions';
import { useCookies } from 'next-client-cookies';

export default function Client({ user }: { user: User | null }) {
    const cookies = useCookies();

    return (
        <div className="grid place-items-center w-full h-full">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl font-extrabold">
                    Hello, {user ? user.username : 'create-l3-app'}!
                </h1>
                {user ? (
                    <Button
                        onClick={() => {
                            cookies.remove('token');
                            window.location.reload();
                        }}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                )}
            </div>
        </div>
    );
}
