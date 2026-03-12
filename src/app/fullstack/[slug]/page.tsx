
import { notFound } from 'next/navigation';
import { FS_MODULES } from '@/lib/data';
import { fullstackModuleContent, fullstackCss } from '@/lib/module-content';
import ModuleContentWrapper from '@/components/ModuleContentWrapper';

export async function generateStaticParams() {
    return FS_MODULES.map((mod) => ({
        slug: mod.slug,
    }));
}

export default async function FullstackModulePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const module = FS_MODULES.find((m) => m.slug === slug);

    if (!module) {
        notFound();
    }

    const htmlContent = (fullstackModuleContent as Record<string, string>)[module.id];

    return (
        <ModuleContentWrapper
            module={module}
            htmlContent={htmlContent}
            css={fullstackCss}
            path="fullstack"
        />
    );
}
