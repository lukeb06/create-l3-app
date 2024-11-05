import { API } from '@/lib/api';

import Client from './client';

export default async function Page() {
    const SERVER = await API();
    const { status } = await SERVER.status.query();

    return (
        <div>
            <h1 className="text-3xl font-extrabold">{status}</h1>

            <Client />
        </div>
    );
}
