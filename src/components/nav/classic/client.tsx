'use client';

import { TITLE } from '@/data/static';
import { Button } from '../../ui/button';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

type Link = {
    id: number;
    href: string;
    label: string;
};
const links: Link[] = [
    // { id: 1, href: '/', label: 'Home' },
    // { id: 2, href: '/test', label: 'Test' },
];

export default function NavClassicClient() {
    const path = usePathname();

    return (
        <nav className="hidden lg:flex flex-row gap-8 items-center w-full p-4 border-b border-border">
            <Link href="/">
                <h1 className="text-lg font-bold flex items-center gap-2">
                    <img src="/visa.svg" className="h-[20px] w-auto" />
                    <span className="text-[#1434CB]">
                        Purchase Alerts
                    </span>
                </h1>
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
            </div>
        </nav>
    );
}