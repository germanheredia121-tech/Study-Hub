
import ModuleSidebar from '@/components/ModuleSidebar';
import { ENGLISH_MODULES } from '@/lib/data';

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[var(--bg)] overflow-hidden">
            <ModuleSidebar modules={ENGLISH_MODULES} path="english" title="Inglés Técnico" />
            <main className="flex-1 min-w-0 ml-0 md:ml-64 min-h-screen bg-[var(--bg)] overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
