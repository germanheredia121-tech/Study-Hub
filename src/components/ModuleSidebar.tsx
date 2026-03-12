
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Module, StudyPath } from '@/lib/types';
import { getProgress, isModuleUnlocked } from '@/lib/utils';
import { useEffect, useState, useCallback } from 'react';
import { getLeetCodeProgress, getLeetCodeCounts, isLeetCodeChallengeComplete, type LeetCodeCompletionStatus } from '@/lib/leetcode-utils';
import { LEETCODE_LAST_THEORETICAL_MODULE } from '@/lib/leetcode-exercises';
import { getCompletedExercises, getExercisesForModule } from '@/lib/interactive-exercises';

interface SidebarProps {
    modules: Module[];
    path: StudyPath;
    title: string;
}

export default function ModuleSidebar({ modules, path, title }: SidebarProps) {
    const pathname = usePathname();
    const [progress, setProgress] = useState<Record<string, boolean>>({});
    const [leetcodeProgress, setLeetcodeProgress] = useState<Record<number, LeetCodeCompletionStatus>>({});
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateProgress = () => setProgress(getProgress(path));
        updateProgress();
        window.addEventListener('progress_updated', updateProgress);
        return () => window.removeEventListener('progress_updated', updateProgress);
    }, [path, pathname]);

    useEffect(() => {
        if (path !== 'dsa') return;
        const update = () => setLeetcodeProgress(getLeetCodeProgress());
        update();
        window.addEventListener('leetcode_progress_updated', update);
        return () => window.removeEventListener('leetcode_progress_updated', update);
    }, [path]);

    const [exercisesPracticed, setExercisesPracticed] = useState<Record<string, boolean>>({});
    useEffect(() => {
        if (path !== 'fullstack') return;
        const update = () => {
            const next: Record<string, boolean> = {};
            modules.forEach((m) => {
                const exs = getExercisesForModule(m.id);
                if (exs.length === 0) return;
                const done = getCompletedExercises(m.id);
                next[m.id] = exs.every((e) => done.includes(e.id));
            });
            setExercisesPracticed(next);
        };
        update();
        window.addEventListener('interactive_exercises_updated', update);
        return () => window.removeEventListener('interactive_exercises_updated', update);
    }, [path, modules]);

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
                className="fixed top-4 left-4 z-[200] md:hidden w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-lg flex items-center justify-center text-[var(--text)] text-lg hover:bg-[var(--surface-2)] transition-colors active:scale-95"
                aria-label="Abrir menú"
            >
                <span className="material-icons">menu</span>
            </button>

            {/* Overlay — mobile only */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[250] md:hidden backdrop-blur-sm dark:bg-black/60"
                    onClick={closeSidebar}
                />
            )}

            <aside
                className={`
                    sidebar fixed inset-y-0 left-0 z-[300] w-[280px] md:w-64 bg-[var(--bg)] border-r border-[var(--border)]
                    transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 transition-transform duration-300 ease-in-out
                    flex flex-col overflow-hidden
                `}
            >
                <div className="p-5 md:p-6 border-b border-[var(--border)] flex items-center justify-between">
                    <div>
                        <Link href="/" className="text-[var(--text-2)] hover:text-[var(--accent)] text-xs font-mono mb-3 block transition-colors flex items-center gap-1">
                            <span className="material-icons text-sm">arrow_back</span>
                            VOLVER AL INICIO
                        </Link>
                        <h2 className="text-lg md:text-xl font-bold text-[var(--text)]">
                            {title}
                        </h2>
                    </div>
                    {/* Close button — mobile only */}
                    <button
                        onClick={closeSidebar}
                        className="md:hidden w-8 h-8 flex items-center justify-center text-[var(--text-2)] hover:text-[var(--text)] text-xl transition-colors"
                        aria-label="Cerrar menú"
                    >
                        <span className="material-icons">close</span>
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
                                        className={`flex flex-col p-3 rounded-lg transition-all border-l-2
                                            ${isActive
                                                ? 'bg-[var(--accent-dim)] text-[var(--accent)] font-medium border-[var(--accent)]'
                                                : 'border-transparent text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[10px] font-mono opacity-50">MÓDULO {String(idx + 1).padStart(2, '0')}</span>
                                            <div className="flex items-center gap-1">
                                                {exercisesPracticed[mod.id] && <span className="text-[var(--accent)] text-[10px] font-medium inline-flex items-center gap-0.5"><span className="material-icons text-[10px]">check_circle</span> Practicado</span>}
                                                {completed && <span className="text-emerald-400 text-[10px] font-bold inline-flex items-center gap-0.5"><span className="material-icons text-[10px]">check_circle</span> DONE</span>}
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold truncate">{mod.title}</span>
                                    </Link>
                                ) : (
                                    <div className="flex flex-col p-3 rounded-lg opacity-50 cursor-not-allowed text-[var(--text-3)]">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono whitespace-nowrap">MÓDULO {String(idx + 1).padStart(2, '0')}</span>
                                            <span className="text-[10px] inline-flex items-center gap-0.5"><span className="material-icons text-[10px]">lock</span> BLOQUEADO</span>
                                        </div>
                                        <span className="text-sm font-semibold truncate">{mod.title}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* LeetCode Challenge — solo para DSA */}
                    {path === 'dsa' && (
                        <>
                            <div className="my-4 border-t border-[var(--border)]" />
                            {(() => {
                                const dsaProgress = getProgress('dsa');
                                const challengeUnlocked = !!dsaProgress[LEETCODE_LAST_THEORETICAL_MODULE];
                                const { easyDone, mediumDone, hardDone } = getLeetCodeCounts(leetcodeProgress);
                                const challengeComplete = isLeetCodeChallengeComplete(leetcodeProgress);
                                const isActive = pathname.includes('leetcode-challenge');

                                return challengeUnlocked ? (
                                    <Link
                                        href="/dsa/leetcode-challenge"
                                        onClick={() => setIsOpen(false)}
                                        className={`flex flex-col p-3 rounded-lg transition-all
                                            ${isActive ? 'bg-[var(--surface-2)] text-[var(--text)] font-medium' : 'text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'}`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[10px] font-mono opacity-50 inline-flex items-center gap-0.5"><span className="material-icons text-[10px]">local_fire_department</span> CHALLENGE</span>
                                            {challengeComplete && <span className="text-emerald-400 text-[10px] font-bold inline-flex items-center gap-0.5"><span className="material-icons text-[10px]">check_circle</span> FINALIZADO</span>}
                                        </div>
                                        <span className="text-sm font-semibold truncate">LeetCode Validation</span>
                                        {!challengeComplete && (
                                            <div className="text-[10px] text-[#666] mt-1 font-mono">
                                                Easy {easyDone}/15 · Med {mediumDone}/15 · Hard {hardDone}/5
                                            </div>
                                        )}
                                    </Link>
                                ) : (
                                    <div className="flex flex-col p-3 rounded-lg opacity-50 cursor-not-allowed text-[var(--text-3)]">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono inline-flex items-center gap-0.5"><span className="material-icons text-[10px]">local_fire_department</span> CHALLENGE</span>
                                            <span className="text-[10px] inline-flex items-center gap-0.5"><span className="material-icons text-[10px]">lock</span> BLOQUEADO</span>
                                        </div>
                                        <span className="text-sm font-semibold truncate">LeetCode Validation</span>
                                        <div className="text-[10px] text-[#666] mt-1 font-mono">Easy 0/15 · Med 0/15 · Hard 0/5</div>
                                    </div>
                                );
                            })()}
                        </>
                    )}
                </nav>
            </aside>
        </>
    );
}
