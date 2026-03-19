
import { notFound } from 'next/navigation';
import { JOB_MODULES } from '@/lib/data';
import { jobModuleContent, fullstackCss } from '@/lib/module-content';
import ModuleContentWrapper from '@/components/ModuleContentWrapper';

export async function generateStaticParams() {
    return JOB_MODULES.map((mod) => ({ slug: mod.slug }));
}

export default async function JobhuntingModulePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const module = JOB_MODULES.find((m) => m.slug === slug);
    if (!module) notFound();
    const htmlContent = (jobModuleContent as Record<string, string>)[module.id];
    return (
        <ModuleContentWrapper module={module} htmlContent={htmlContent} css={fullstackCss} path="jobhunting" />
    );
}
