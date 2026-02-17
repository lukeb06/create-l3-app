import { getAuth } from '@/lib/get-auth';
import Client from './client';

export default async function Page() {
    const { user } = await getAuth();

    return <Client user={user} />;
}
