'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CardForm from "../card-form";

export default function Client() {
    return (
        <div className="w-full h-full p-4 pt-8">
            <h1 className="text-3xl font-semibold">Verify ownership</h1>
            <p className="mt-6">Verify ownership of your debit or ATM card.</p>

            <CardForm label="Verify" />
        </div>
    )
}