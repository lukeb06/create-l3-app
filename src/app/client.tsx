'use client';

import { useAPI } from '@/hooks/use-api';

export default function Client() {
    const SERVER = useAPI();

    return (
        <>
            <button
                onClick={() => {
                    SERVER.echo
                        .query({ message: prompt() || '' })
                        .then(({ message }) => alert(message));
                }}
            >
                echo
            </button>
        </>
    );
}
