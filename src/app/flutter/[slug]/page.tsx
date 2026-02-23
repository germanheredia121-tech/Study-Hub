
import { notFound } from 'next/navigation';
import { FLUTTER_MODULES } from '@/lib/data';
import { flutterModuleContent, flutterCss } from '@/lib/module-content';
import ModuleContentWrapper from '@/components/ModuleContentWrapper';

export async function generateStaticParams() {
    return FLUTTER_MODULES.map((mod) => ({
        slug: mod.slug,
    }));
}

export default async function FlutterModulePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const module = FLUTTER_MODULES.find((m) => m.slug === slug);

    if (!module) {
        notFound();
    }

    const htmlContent = (flutterModuleContent as Record<string, string>)[module.id];

    return (
        <ModuleContentWrapper
            module={module}
            htmlContent={htmlContent}
            css={flutterCss}
            path="flutter"
        />
    );
}
