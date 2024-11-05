'use client';

import { useAPI } from '@/hooks/use-api';
import { useRouter } from 'next/navigation';

export default function Client() {
    const [SERVER, setHeaders] = useAPI();

    const router = useRouter();

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
