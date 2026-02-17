import { getAuth } from '@/lib/get-auth';
import NavClassicClient from './client';

export default async function NavClassic() {
    const { user } = await getAuth();

    return <NavClassicClient user={user} />;
}
