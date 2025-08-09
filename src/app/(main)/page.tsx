import { Button } from '@/components/ui/button';
import { Link } from 'next-view-transitions';

export default async function Page() {
    return (
        <div className="grid place-items-center w-full h-full">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl font-extrabold">Hello, create-l3-app!</h1>
                <div className="flex flex-row gap-4">
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Register</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
