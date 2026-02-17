import LoginPage from '@/app/login/page';
import { getAuth } from '@/lib/get-auth';
import { LogoutButton } from './client';

export default async function ProfilePage() {
    const { user } = await getAuth();

    if (!user) return <LoginPage />;
    return (
        <div className="flex flex-col gap-4 p-4">
            <span>logged in as: {user?.username}</span>
            <LogoutButton />
        </div>
    );
}
