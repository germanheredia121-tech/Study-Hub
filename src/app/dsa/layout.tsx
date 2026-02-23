
import ModuleSidebar from '@/components/ModuleSidebar';
import { DSA_MODULES } from '@/lib/data';

export default function DSALayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-black text-white overflow-hidden">
            <ModuleSidebar
                modules={DSA_MODULES}
                path="dsa"
                title="DSA & LeetCode"
            />
            <main className="flex-1 min-w-0 ml-0 md:ml-64 min-h-screen bg-black overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
