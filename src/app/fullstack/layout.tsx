
import ModuleSidebar from '@/components/ModuleSidebar';
import { FS_MODULES } from '@/lib/data';

export default function FullstackLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[var(--bg)] overflow-hidden">
            <ModuleSidebar
                modules={FS_MODULES}
                path="fullstack"
                title="Full Stack Web"
            />
            <main className="flex-1 min-w-0 ml-0 md:ml-64 min-h-screen bg-[var(--bg)] overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
