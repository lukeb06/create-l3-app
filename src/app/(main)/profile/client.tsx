'use client';

import { Button } from '@/components/ui/button';
import { useCookies } from 'next-client-cookies';

export function LogoutButton() {
    const cookies = useCookies();

    return (
        <Button
            onClick={() => {
                cookies.remove('token');
                cookies.remove('refresh');
                window.location.href = '/';
            }}
        >
            Logout
        </Button>
    );
}
