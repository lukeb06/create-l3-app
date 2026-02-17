'use client';

import { TITLE } from '@/data/static';
import { UserIcon, HomeIcon } from 'lucide-react';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

const links = [
    { id: 1, href: '/', icon: <HomeIcon size={32} /> },
    { id: 2, href: '/profile', icon: <UserIcon size={32} /> },
];

export default function NavMobile() {
    const path = usePathname();

    return (
        <nav className="flex lg:hidden flex-row items-center justify-evenly border-t border-border w-full">
            {links.map(link => (
                <Link
                    key={link.id}
                    href={link.href}
                    className={`p-4 pb-10 ${path === link.href ? 'text-foreground' : 'text-neutral-500'} flex-1 flex justify-center`}
                >
                    {link.icon}
                </Link>
            ))}
        </nav>
    );
}

export function MobileHeader() {
    const router = useTransitionRouter();

    return (
        <div
            className="grid place-items-center lg:hidden w-full border-b border-border p-4"
            style={{ gridTemplateColumns: '1fr 50% 1fr' }}
        >
            <div></div>
            <Link href="/" onClick={() => router.refresh()}>
                <h1 className="text-xl font-bold text-center">{TITLE}</h1>
            </Link>
            <div></div>
        </div>
    );
}
