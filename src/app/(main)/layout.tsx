import NavClassic from '@/components/nav/classic';
import NavMobile from '@/components/nav/mobile';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-full">
            <NavClassic />
            <div className="flex-1 overflow-auto">{children}</div>
            <NavMobile />
        </div>
    );
}
