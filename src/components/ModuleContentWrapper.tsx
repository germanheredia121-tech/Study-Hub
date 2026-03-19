'use client';

import { useState } from 'react';
import { Module, StudyPath } from '@/lib/types';
import ModuleViewer from './ModuleViewer';
import Quiz from './Quiz';
import InteractiveExercise from './InteractiveExercise';
import { useRouter } from 'next/navigation';
import { getModulesForPath } from '@/lib/data';
import { getExercisesForModule } from '@/lib/interactive-exercises';

interface ModuleContentWrapperProps {
    module: Module;
    htmlContent: string;
    css: string;
    path: StudyPath;
}

export default function ModuleContentWrapper({ module, htmlContent, css, path }: ModuleContentWrapperProps) {
    const router = useRouter();
    const [isQuizMode, setIsQuizMode] = useState(false);

    const handleComplete = () => {
        const modules = getModulesForPath(path);
        const currentIndex = modules.findIndex(m => m.id === module.id);
        const nextModule = modules[currentIndex + 1];

        if (nextModule) {
            router.push(`/${path}/${nextModule.slug}`);
        } else {
            router.push('/');
        }
    };

    if (isQuizMode) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 md:p-8 w-full animate-in fade-in duration-500">
                <div className="w-full max-w-2xl relative">
                    <button
                        onClick={() => setIsQuizMode(false)}
                        className="absolute -top-12 left-0 text-[#888888] hover:text-[#0F0F0F] transition-colors text-sm font-medium flex items-center gap-2"
                    >
                        <span className="material-icons text-sm">arrow_back</span> Volver a la lectura
                    </button>
                    <Quiz
                        questions={module.quiz}
                        moduleId={module.id}
                        path={path}
                        onComplete={handleComplete}
                    />
                </div>
            </div>
        );
    }

    const exercises = (path === 'fullstack' || path === 'nextjs') ? getExercisesForModule(module.id) : [];

    return (
        <div className="px-3 pt-16 md:p-8 pb-32 max-w-5xl mx-auto animate-in fade-in module-content-container">
            <ModuleViewer html={htmlContent} css={css} />

            {exercises.length > 0 && (
                <div className="mt-16 space-y-2">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#0F0F0F]">
                        Ejercicios Interactivos
                    </h2>
                    <p className="text-[#888888] text-sm mb-6">
                        Practicá cada concepto escribiendo código. Opcional pero recomendado.
                    </p>
                    <div className="space-y-8">
                        {exercises.map((ex) => (
                            <InteractiveExercise
                                key={ex.id}
                                exercise={ex}
                                moduleId={module.id}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-20 pt-12 flex flex-col items-center border-t border-[var(--border)] text-center space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0F0F0F]">Validación de Conocimiento</h2>
                    <p className="text-[#888888]">Demuestra lo que has aprendido para desbloquear el siguiente módulo.</p>
                </div>
                <button
                    onClick={() => setIsQuizMode(true)}
                    className="bg-[var(--accent)] text-[#0F0F0F] hover:opacity-90 font-medium px-8 py-3 rounded-full transition-colors w-full md:w-auto min-w-[200px] shadow-lg "
                >
                    Empezar Quiz
                </button>
            </div>
        </div>
    );
}
