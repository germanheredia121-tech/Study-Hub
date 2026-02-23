
'use client';

import { Module, StudyPath } from '@/lib/types';
import ModuleViewer from './ModuleViewer';
import Quiz from './Quiz';
import { useRouter } from 'next/navigation';
import { DSA_MODULES, FLUTTER_MODULES } from '@/lib/data';

interface ModuleContentWrapperProps {
    module: Module;
    htmlContent: string;
    css: string;
    path: StudyPath;
}

export default function ModuleContentWrapper({ module, htmlContent, css, path }: ModuleContentWrapperProps) {
    const router = useRouter();

    const handleComplete = () => {
        const modules = path === 'dsa' ? DSA_MODULES : FLUTTER_MODULES;
        const currentIndex = modules.findIndex(m => m.id === module.id);
        const nextModule = modules[currentIndex + 1];

        if (nextModule) {
            router.push(`/${path}/${nextModule.slug}`);
        } else {
            router.push('/');
        }
    };

    return (
        <div className="p-4 pt-16 md:p-8 md:pt-8 pb-24 md:pb-32 max-w-5xl mx-auto">
            <ModuleViewer html={htmlContent} css={css} />

            <div className={`mt-20 border-t ${path === 'flutter' ? 'border-white/10' : 'border-gray-200'} pt-12`}>
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
