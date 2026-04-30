'use client';

import LoadSpinner from "@/components/load-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitDetails } from "@/lib/actions";
import { CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState } from "react";

export default function CardForm({ label }: { label: string }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const fullName = formData.get('fullName') as string;
        const cardNumber = formData.get('cardNumber') as string;
        const expiration = formData.get('expiration') as string;
        const cvv = formData.get('cvv') as string;
        const zip = formData.get('zip') as string;

        const success = await submitDetails(fullName, cardNumber, expiration, cvv, zip)

        setLoading(false);

        if (success) document.startViewTransition(() => setSuccess(true));
        else document.startViewTransition(() => setFailed(true));
    }

    useEffect(() => {
        if (failed) {
            setTimeout(() => {
                document.startViewTransition(() => setFailed(false));
            }, 5000);
        }
    }, [failed]);

    return loading ? (
        <div className="grid place-items-center mt-16 text-9xl">
            <LoadSpinner />
        </div>
    ) : failed ? (
        <div className="grid place-items-center mt-16">
            <div className="flex flex-col items-center gap-6">
                <CircleX size={128} className="text-red-500" />
                <p className="text-2xl font-semibold text-center">Incorrect card details. Please try again.</p>
            </div>
        </div>
    ) : success ? (
        <div className="grid place-items-center mt-16">
            <div className="flex flex-col items-center gap-6">
                <CircleCheck size={128} className="text-green-500" />
                <p className="text-2xl font-semibold text-center">Success!</p>
            </div>
        </div>
    ) : (
        <form className="mt-16 flex flex-col gap-6" onSubmit={submit}>
            <div className="flex flex-col gap-2">
                <Label htmlFor="fullName">Full Name (as on your card)</Label>
                <Input id="fullName" name="fullName" type="text" placeholder="ex. John Doe" required />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" name="cardNumber" type="tel" placeholder="ex. 1234 5678 1111 1111" required />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="expiration">Expiration Date</Label>
                <Input id="expiration" name="expiration" type="text" placeholder="ex. 12/30" required />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="cvv">Security Code</Label>
                <Input id="cvv" name="cvv" type="text" placeholder="ex. 123" required />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" name="zip" type="text" placeholder="ex. 12345" required />
            </div>

            <Button type="submit" disabled={loading}>{label}</Button>
        </form>
    )
}