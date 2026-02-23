
import { notFound } from 'next/navigation';
import { DSA_MODULES } from '@/lib/data';
import { dsaModuleContent, dsaCss } from '@/lib/module-content';
import ModuleContentWrapper from '@/components/ModuleContentWrapper';

export async function generateStaticParams() {
    return DSA_MODULES.map((mod) => ({
        slug: mod.slug,
    }));
}

export default async function DSAModulePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const module = DSA_MODULES.find((m) => m.slug === slug);

    if (!module) {
        notFound();
    }

    const htmlContent = (dsaModuleContent as Record<string, string>)[module.id];

    return (
        <ModuleContentWrapper
            module={module}
            htmlContent={htmlContent}
            css={dsaCss}
            path="dsa"
        />
    );
}
