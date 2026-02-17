import { MobileHeader } from '@/components/nav/mobile';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-full">
            <MobileHeader />
            <div className="flex-1 overflow-auto">{children}</div>
        </div>
    );
}
