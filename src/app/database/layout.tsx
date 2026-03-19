
import ModuleSidebar from '@/components/ModuleSidebar';
import { DB_MODULES } from '@/lib/data';

export default function DatabaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[var(--bg)] overflow-hidden">
            <ModuleSidebar modules={DB_MODULES} path="database" title="Base de Datos Moderna" />
            <main className="flex-1 min-w-0 ml-0 md:ml-64 min-h-screen bg-[var(--bg)] overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
