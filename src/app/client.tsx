'use client';

import { useAPI } from '@/hooks/use-api';

export default function Client() {
    const [SERVER, _] = useAPI();

    return (
        <>
            <button
                onClick={() => {
                    console.log(SERVER, typeof SERVER);
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
