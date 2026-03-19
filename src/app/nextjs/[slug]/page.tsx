
import { notFound } from 'next/navigation';
import { NEXTJS_MODULES } from '@/lib/data';
import { nextjsModuleContent, fullstackCss } from '@/lib/module-content';
import ModuleContentWrapper from '@/components/ModuleContentWrapper';

export async function generateStaticParams() {
    return NEXTJS_MODULES.map((mod) => ({
        slug: mod.slug,
    }));
}

export default async function NextjsModulePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const module = NEXTJS_MODULES.find((m) => m.slug === slug);

    if (!module) {
        notFound();
    }

    const htmlContent = (nextjsModuleContent as Record<string, string>)[module.id];

    return (
        <ModuleContentWrapper
            module={module}
            htmlContent={htmlContent}
            css={fullstackCss}
            path="nextjs"
        />
    );
}
