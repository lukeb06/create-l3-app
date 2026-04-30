'use client';

import { TITLE } from '@/data/static';
import { Button } from '../../ui/button';
import { Link } from 'next-view-transitions';
import { useCookies } from 'next-client-cookies';
import { usePathname } from 'next/navigation';
import type { User } from 'generated/prisma';

type Link = {
    id: number;
    href: string;
    label: string;
};
const links: Link[] = [
    // { id: 1, href: '/', label: 'Home' },
    // { id: 2, href: '/test', label: 'Test' },
];

export default function NavClassicClient({ user }: { user: User | null }) {
    const path = usePathname();

    return (
        <nav className="hidden lg:flex flex-row gap-8 items-center w-full p-4 border-b border-border">
            <Link href="/">
                <h1 className="text-xl font-bold">{TITLE}</h1>
            </Link>
            <div className="flex-1 flex flex-row items-center justify-end gap-4">
                {links.map(link => (
                    <Button
                        asChild
                        key={link.id}
                        variant={path === link.href ? 'secondary' : 'ghost'}
                    >
                        <Link key={link.id} href={link.href}>
                            {link.label}
                        </Link>
                    </Button>
                ))}
                <AuthButton user={user} />
            </div>
        </nav>
    );
}

function AuthButton({ user }: { user: User | null }) {
    const cookies = useCookies();

    return (
        <>
            {user ? (
                <Button
                    onClick={() => {
                        cookies.remove('token');
                        cookies.remove('refresh');
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
        </>
    );
}
