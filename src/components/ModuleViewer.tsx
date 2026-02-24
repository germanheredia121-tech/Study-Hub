
'use client';

import { useEffect, useRef } from 'react';

interface ModuleViewerProps {
    html: string;
    css: string;
    className?: string;
}

export default function ModuleViewer({ html, css, className }: ModuleViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const styleId = 'module-styles-' + (css.length % 1000);
        if (!document.getElementById(styleId)) {
            // Strip dangerous global selectors that break the Next.js layout
            const dangerousSelectors = [
                /^\s*\*\s*\{[^}]*\}/gm,
                /^\s*html\s*\{[^}]*\}/gm,
                /^\s*body\s*\{[^}]*\}/gm,
                /^\s*\.sidebar[^{]*\{[^}]*\}/gm,
                /^\s*\.sidebar-logo[^{]*\{[^}]*\}/gm,
                /^\s*\.sidebar::[^{]*\{[^}]*\}/gm,
                /^\s*\.sidebar nav[^{]*\{[^}]*\}/gm,
                /^\s*\.nav-section[^{]*\{[^}]*\}/gm,
                /^\s*\.nav-item[^{]*\{[^}]*\}/gm,
                /^\s*\.main\s*\{[^}]*\}/gm,
                /^\s*\.hero[^{]*\{[^}]*\}/gm,
                /^\s*\.scroll-top[^{]*\{[^}]*\}/gm,
                // Strip .content padding (desktop 60px) — we replace it with responsive values
                /^\s*\.content\s*\{[^}]*\}/gm,
                // Strip the original mobile media query — we provide our own
                /@media\s*\(max-width:\s*768px\)\s*\{[\s\S]*?\n\s*\}/gm,
            ];

            let scopedCss = css;
            dangerousSelectors.forEach(regex => {
                scopedCss = scopedCss.replace(regex, '');
            });

            // Scope remaining selectors under #module-content-root
            scopedCss = scopedCss.replace(
                /([^\r\n,{}]+)(,(?=[^}]*\{)|\s*\{)/g,
                (match, selector, ending) => {
                    const trimmed = selector.trim();
                    if (trimmed.startsWith('@') || trimmed.startsWith('#module-content-root') || trimmed === ':root' || trimmed === '') {
                        return match;
                    }
                    return `#module-content-root ${trimmed}${ending}`;
                }
            );

            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = scopedCss;
            document.head.appendChild(style);

            // Inject overflow containment + responsive overrides
            const overrideStyleId = 'module-mobile-overrides';
            if (!document.getElementById(overrideStyleId)) {
                const overrideStyle = document.createElement('style');
                overrideStyle.id = overrideStyleId;
                overrideStyle.innerHTML = `
                    /* === ALL SCREENS: containment + responsive .content === */
                    #module-content-root,
                    #module-content-root .module-content-container,
                    #module-content-root .content {
                        max-width: 100% !important;
                        overflow-x: hidden !important;
                        box-sizing: border-box !important;
                        width: 100% !important;
                    }
                    #module-content-root .content {
                        padding: 0 16px 60px !important;
                    }
                    #module-content-root * {
                        box-sizing: border-box !important;
                    }
                    #module-content-root .module-header,
                    #module-content-root .section,
                    #module-content-root .concept,
                    #module-content-root .concept-explain,
                    #module-content-root .concept-desc,
                    #module-content-root .quiz-block,
                    #module-content-root .info-box,
                    #module-content-root .interview-q {
                        max-width: 100% !important;
                        overflow-x: hidden !important;
                        word-break: break-word !important;
                        overflow-wrap: break-word !important;
                    }
                    #module-content-root .ide {
                        max-width: 100% !important;
                        overflow: hidden !important;
                    }
                    #module-content-root .ide-body {
                        overflow-x: auto !important;
                        max-width: 100% !important;
                    }
                    #module-content-root p,
                    #module-content-root li,
                    #module-content-root .answer,
                    #module-content-root .question {
                        word-break: break-word !important;
                        overflow-wrap: break-word !important;
                    }
                    #module-content-root .data-table {
                        display: block !important;
                        overflow-x: auto !important;
                        max-width: 100% !important;
                    }

                    /* Desktop: wider padding */
                    @media (min-width: 768px) {
                        #module-content-root .content {
                            padding: 0 48px 80px !important;
                            max-width: 900px !important;
                        }
                    }

                    /* === MOBILE: compact spacing === */
                    @media (max-width: 767px) {
                        #module-content-root .content {
                            padding: 0 6px 40px !important;
                        }
                        #module-content-root .module-header {
                            padding: 24px 0 16px !important;
                        }
                        #module-content-root .module-header h2 {
                            font-size: 20px !important;
                        }
                        #module-content-root .module-header p {
                            font-size: 13px !important;
                        }
                        #module-content-root .module-number {
                            font-size: 10px !important;
                        }
                        #module-content-root .section-title {
                            font-size: 14px !important;
                        }
                        #module-content-root .concept-header {
                            padding: 8px 10px !important;
                        }
                        #module-content-root .concept-title {
                            font-size: 12px !important;
                        }
                        #module-content-root .concept-explain {
                            padding: 10px 12px !important;
                            font-size: 12px !important;
                        }
                        #module-content-root .concept-desc {
                            padding: 8px 12px !important;
                            font-size: 12.5px !important;
                        }
                        #module-content-root .ide-body {
                            font-size: 10.5px !important;
                        }
                        #module-content-root .ide-topbar {
                            padding: 5px 8px !important;
                            font-size: 10px !important;
                        }
                        #module-content-root .line-num,
                        #module-content-root .ln {
                            min-width: 28px !important;
                            padding-right: 8px !important;
                            font-size: 10px !important;
                        }
                        #module-content-root .code-line,
                        #module-content-root .cl {
                            min-width: max-content !important;
                            padding-right: 12px !important;
                        }
                        #module-content-root .quiz-block {
                            margin: 20px 0 12px !important;
                        }
                        #module-content-root .quiz-header {
                            padding: 12px 14px 8px !important;
                        }
                        #module-content-root .quiz-title {
                            font-size: 14px !important;
                        }
                        #module-content-root .quiz-questions {
                            padding: 12px 14px !important;
                        }
                        #module-content-root .quiz-option {
                            padding: 8px 10px !important;
                            font-size: 11.5px !important;
                            min-height: 44px !important;
                        }
                        #module-content-root .quiz-submit {
                            width: calc(100% - 28px) !important;
                            margin: 0 14px 12px !important;
                            min-height: 44px !important;
                        }
                        #module-content-root .info-box {
                            padding: 8px 12px !important;
                            font-size: 11.5px !important;
                        }
                        #module-content-root .interview-q-header {
                            padding: 8px 12px !important;
                        }
                        #module-content-root .interview-q-body {
                            padding: 8px 12px !important;
                        }
                        #module-content-root .tag {
                            font-size: 11px !important;
                            padding: 1px 4px !important;
                        }
                    }
                `;
                document.head.appendChild(overrideStyle);
            }
        }
    }, [css]);

    return (
        <div id="module-content-root" style={{ maxWidth: '100%', overflowX: 'hidden', width: '100%' }}>
            <div
                ref={containerRef}
                className={`module-content-container ${className || ''}`}
                style={{ maxWidth: '100%', overflowX: 'hidden', width: '100%' }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}
