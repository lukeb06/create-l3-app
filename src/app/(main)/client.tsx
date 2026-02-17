'use client';

import { Button } from '@/components/ui/button';
import type { User } from 'generated/prisma';
import { usePersistentState } from '@/hooks/use-persistent-state';

export default function Client({ user }: { user: User | null }) {
    const [count, setCount] = usePersistentState('count', 0);

    return (
        <div className="grid place-items-center w-full h-full">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl font-extrabold">
                    Hello, {user ? user.username : 'guest'}!
                </h1>
                <p>Count: {count}</p>
                <Button onClick={() => setCount(count + 1)}>Increment</Button>
            </div>
        </div>
    );
}
