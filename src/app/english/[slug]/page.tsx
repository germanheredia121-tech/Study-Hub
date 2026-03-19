
import { notFound } from 'next/navigation';
import { ENGLISH_MODULES } from '@/lib/data';
import { englishModuleContent, fullstackCss } from '@/lib/module-content';
import ModuleContentWrapper from '@/components/ModuleContentWrapper';

export async function generateStaticParams() {
    return ENGLISH_MODULES.map((mod) => ({ slug: mod.slug }));
}

export default async function EnglishModulePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const module = ENGLISH_MODULES.find((m) => m.slug === slug);
    if (!module) notFound();
    const htmlContent = (englishModuleContent as Record<string, string>)[module.id];
    return (
        <ModuleContentWrapper module={module} htmlContent={htmlContent} css={fullstackCss} path="english" />
    );
}
