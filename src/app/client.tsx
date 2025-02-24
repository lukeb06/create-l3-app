'use client';

import { Button } from '@/components/ui/button';
import { useAPI } from '@/hooks/use-api';

export default function Client() {
    const SERVER = useAPI();

    return (
        <>
            <Button
                onClick={() => {
                    SERVER.echo
                        .query({ message: prompt() || '' })
                        .then(({ message }) => alert(message));
                }}
            >
                echo
            </Button>
        </>
    );
}
