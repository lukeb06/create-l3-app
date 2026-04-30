'use client';

import { TITLE } from '@/data/static';
import { UserIcon, HomeIcon } from 'lucide-react';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

const links = [
    { id: 1, href: '/', icon: <HomeIcon size={32} /> },
];

export default function NavMobile() {
    const path = usePathname();

    return null;
    // return (
    //     <nav className="flex lg:hidden flex-row items-center justify-evenly border-t border-border w-full">
    //         {links.map(link => (
    //             <Link
    //                 key={link.id}
    //                 href={link.href}
    //                 className={`p-4 pb-10 ${path === link.href ? 'text-foreground' : 'text-neutral-500'} flex-1 flex justify-center`}
    //             >
    //                 {link.icon}
    //             </Link>
    //         ))}
    //     </nav>
    // );
}

export function MobileHeader() {
    const router = useTransitionRouter();

    return (
        <div
            className="lg:hidden w-full p-4"
        >
            <Link href="/" onClick={() => router.refresh()}>
                <h1 className="text-lg font-bold flex items-center gap-2">
                    <img src="/visa.svg" className="h-[20px] w-auto" />
                    <span className="text-[#1434CB]">
                        Purchase Alerts
                    </span>
                </h1>
            </Link>
        </div>
    );
}
