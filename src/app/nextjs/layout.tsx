
import ModuleSidebar from '@/components/ModuleSidebar';
import { NEXTJS_MODULES } from '@/lib/data';

export default function NextjsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[var(--bg)] overflow-hidden">
            <ModuleSidebar
                modules={NEXTJS_MODULES}
                path="nextjs"
                title="Next.js Moderno"
            />
            <main className="flex-1 min-w-0 ml-0 md:ml-64 min-h-screen bg-[var(--bg)] overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
