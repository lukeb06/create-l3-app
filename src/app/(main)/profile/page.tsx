import { getAuth } from '@/lib/get-auth';
import { LogoutButton } from './client';
import { redirect } from 'next/navigation';
import { TITLE, DESC } from '@/data/static';

export const metadata = {
    title: `Profile | ${TITLE}`,
    description: DESC,
};

export default async function ProfilePage() {
    const { user } = await getAuth();

    if (!user) return redirect('/login');
    return (
        <div className="flex flex-col gap-4 p-4">
            <span>logged in as: {user?.username}</span>
            <LogoutButton />
        </div>
    );
}
