'use client';

import { UserIcon, HomeIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

const links = [
    { id: 1, href: '/', icon: <HomeIcon size={32} /> },
    { id: 2, href: '/profile', icon: <UserIcon size={32} /> },
];

export default function NavMobile() {
    const path = usePathname();

    return (
        <nav className="flex lg:hidden flex-row items-center justify-evenly border-t border-border w-full p-4 pb-8">
            {links.map(link => (
                <Link
                    key={link.id}
                    href={link.href}
                    className={`${path === link.href ? 'text-foreground' : 'text-neutral-500'}`}
                >
                    {link.icon}
                </Link>
            ))}
        </nav>
    );
}
