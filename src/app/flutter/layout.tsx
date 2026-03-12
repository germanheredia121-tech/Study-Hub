
import ModuleSidebar from '@/components/ModuleSidebar';
import { FLUTTER_MODULES } from '@/lib/data';

export default function FlutterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[var(--bg)] overflow-hidden">
            <ModuleSidebar
                modules={FLUTTER_MODULES}
                path="flutter"
                title="Flutter Mastery"
            />
            <main className="flex-1 min-w-0 ml-0 md:ml-64 min-h-screen bg-[var(--bg)] overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
