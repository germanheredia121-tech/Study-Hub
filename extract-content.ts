
import fs from 'fs';
import path from 'path';

function extractModule(filePath: string, startId: string, nextId?: string): string {
    const content = fs.readFileSync(filePath, 'utf-8');
    const startTag = `<div id="${startId}"`;
    const startIndex = content.indexOf(startTag);

    if (startIndex === -1) return "Module not found";

    let endIndex = content.length;
    if (nextId) {
        const nextTag = `<div id="${nextId}"`;
        const nextIndex = content.indexOf(nextTag);
        if (nextIndex !== -1) {
            endIndex = nextIndex;
        }
    } else {
        // If no next ID, look for the closing of the main container or end of file
        const mainEnd = content.indexOf('</div>\n\n  </div>', startIndex);
        if (mainEnd !== -1) endIndex = mainEnd;
    }

    return content.slice(startIndex, endIndex).trim();
}

const dsaPath = path.join(process.cwd(), 'public/dsa_leetcode_completo.html');
const flutterPath = path.join(process.cwd(), 'public/flutter_guide_completo.html');

const dsaModuleIds = ['bigo', 'arrays', 'linked', 'stacks', 'hashmaps', 'trees', 'graphs', 'heaps', 'trie', 'dp', 'backtrack', 'bsearch', 'sim'];
const flutterModuleIds = ['mod1', 'mod2', 'mod3', 'mod4', 'mod5', 'mod6', 'mod7', 'mod8', 'mod9', 'mod10', 'mod11', 'mod12', 'mod13', 'mod14', 'mod15', 'mod16', 'mod17'];

const dsaModules: Record<string, string> = {};
dsaModuleIds.forEach((id, i) => {
    dsaModules[id] = extractModule(dsaPath, id, dsaModuleIds[i + 1]);
});

const flutterModules: Record<string, string> = {};
flutterModuleIds.forEach((id, i) => {
    flutterModules[id] = extractModule(flutterPath, id, flutterModuleIds[i + 1]);
});

// Also extract CSS
const getCss = (html: string) => {
    const start = html.indexOf('<style>') + 7;
    const end = html.indexOf('</style>');
    return html.slice(start, end);
};

const dsaCss = getCss(fs.readFileSync(dsaPath, 'utf-8'));
const flutterCss = getCss(fs.readFileSync(flutterPath, 'utf-8'));

fs.writeFileSync('src/lib/module-content.ts', `
export const dsaCss = \`${dsaCss.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;
export const flutterCss = \`${flutterCss.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;

export const dsaModuleContent: Record<string, string> = ${JSON.stringify(dsaModules, null, 2)};
export const flutterModuleContent: Record<string, string> = ${JSON.stringify(flutterModules, null, 2)};
`);

console.log("Module content extracted successfully.");
