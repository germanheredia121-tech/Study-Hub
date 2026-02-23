
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Module, StudyPath } from '@/lib/types';
import { getProgress, isModuleUnlocked } from '@/lib/utils';
import { useEffect, useState, useCallback } from 'react';

interface SidebarProps {
    modules: Module[];
    path: StudyPath;
    title: string;
}

export default function ModuleSidebar({ modules, path, title }: SidebarProps) {
    const pathname = usePathname();
    const [progress, setProgress] = useState<Record<string, boolean>>({});
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateProgress = () => setProgress(getProgress(path));
        updateProgress();
        window.addEventListener('progress_updated', updateProgress);
        return () => window.removeEventListener('progress_updated', updateProgress);
    }, [path, pathname]);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Lock body scroll when sidebar is open on mobile
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const closeSidebar = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {/* Hamburger button — mobile only */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-[200] md:hidden w-10 h-10 bg-[#1a1a24] border border-[#2a2a38] rounded-lg flex items-center justify-center text-white text-lg hover:bg-[#252535] transition-colors active:scale-95"
                aria-label="Abrir menú"
            >
                ☰
            </button>

            {/* Overlay — mobile only */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[250] md:hidden backdrop-blur-sm"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    sidebar fixed inset-y-0 left-0 z-50 w-[280px] md:w-64 bg-black border-r border-white/10
                    transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 transition-transform duration-300 ease-in-out
                    flex flex-col overflow-hidden
                `}
            >
                <div className="p-5 md:p-6 border-b border-[#2a2a38] flex items-center justify-between">
                    <div>
                        <Link href="/" className="text-gray-500 hover:text-white text-xs font-mono mb-3 block transition-colors">
                            ← VOLVER AL INICIO
                        </Link>
                        <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            {title}
                        </h2>
                    </div>
                    {/* Close button — mobile only */}
                    <button
                        onClick={closeSidebar}
                        className="md:hidden w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white text-xl transition-colors"
                        aria-label="Cerrar menú"
                    >
                        ✕
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-3 md:p-4 space-y-1">
                    {modules.map((mod, idx) => {
                        const isActive = pathname.includes(mod.slug);
                        const unlocked = mounted ? isModuleUnlocked(path, mod.id, modules) : (idx === 0);
                        const completed = mounted ? progress[mod.id] : false;

                        return (
                            <div key={mod.id} className="relative group">
                                {unlocked ? (
                                    <Link
                                        href={`/${path}/${mod.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex flex-col p-3 rounded-lg transition-all
                                            ${isActive
                                                ? 'bg-white/10 text-white font-medium'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[10px] font-mono opacity-50">MÓDULO {String(idx + 1).padStart(2, '0')}</span>
                                            {completed && <span className="text-emerald-400 text-[10px] font-bold">✓ DONE</span>}
                                        </div>
                                        <span className="text-sm font-semibold truncate">{mod.title}</span>
                                    </Link>
                                ) : (
                                    <div className="flex flex-col p-3 rounded-lg opacity-50 cursor-not-allowed">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono whitespace-nowrap">MÓDULO {String(idx + 1).padStart(2, '0')}</span>
                                            <span className="text-[10px]">🔒 BLOQUEADO</span>
                                        </div>
                                        <span className="text-sm font-semibold truncate">{mod.title}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
