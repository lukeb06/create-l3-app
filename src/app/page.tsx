import { API } from '@/lib/api';

import Client from './client';

export default async function Page() {
    const SERVER = await API();
    const { status } = await SERVER.status.query();

    return (
        <div className="grid place-items-center w-full h-full">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl font-extrabold">{status}</h1>

                <Client />
            </div>
        </div>
    );
}
