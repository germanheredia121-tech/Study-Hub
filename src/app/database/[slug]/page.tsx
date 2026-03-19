
import { notFound } from 'next/navigation';
import { DB_MODULES } from '@/lib/data';
import { databaseModuleContent, fullstackCss } from '@/lib/module-content';
import ModuleContentWrapper from '@/components/ModuleContentWrapper';

export async function generateStaticParams() {
    return DB_MODULES.map((mod) => ({ slug: mod.slug }));
}

export default async function DatabaseModulePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const module = DB_MODULES.find((m) => m.slug === slug);
    if (!module) notFound();
    const htmlContent = (databaseModuleContent as Record<string, string>)[module.id];
    return (
        <ModuleContentWrapper module={module} htmlContent={htmlContent} css={fullstackCss} path="database" />
    );
}
