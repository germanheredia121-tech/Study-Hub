const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

/**
 * Helper to wrap Dart snippets into complete files
 */
function wrapDartSnippet(code, filename) {
    const dartExts = ['.dart', '.py']; // py will be turned to dart
    const ext = filename ? path.extname(filename).toLowerCase() : '';
    if (ext && !dartExts.includes(ext) && filename !== 'main.dart') {
        return code;
    }

    if (code.includes('import ') || code.includes('void main()') || code.includes('class ') || code.includes('runs-on:')) {
        return code;
    }

    let imports = "import 'package:flutter/material.dart';\n\n";
    if (code.includes('HttpClient') || code.includes('get(')) {
        imports = "import 'package:http/http.dart' as http;\nimport 'dart:convert';\n\n";
    }

    return `${imports}void main() {\n  ${code.split('\n').join('\n  ')}\n}`;
}

/**
 * Simple Syntax Highlighter for Dart
 */
function highlightCode(line) {
    if (!line) return '';

    // 1. Escape HTML
    let text = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 2. Protect strings and comments
    const protected = [];
    const protect = (content, className) => {
        const id = `\x00\x00PH${protected.length}\x00\x00`;
        protected.push(`<span class="${className}">${content}</span>`);
        return id;
    };

    text = text.replace(/\/\/.*$/g, m => protect(m, 'cmt'));
    text = text.replace(/("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g, m => protect(m, 'str'));

    // 3. Highlight keywords
    const keywords = [
        'import', 'void', 'main', 'class', 'final', 'const', 'var', 'dynamic', 'if', 'else',
        'while', 'for', 'in', 'return', 'try', 'catch', 'await', 'async', 'yield', 'late',
        'required', 'super', 'extends', 'implements', 'with', 'abstract', 'static',
        'get', 'set', 'true', 'false', 'null', 'as', 'is', 'package', 'show', 'hide',
        'export', 'library', 'part', 'of', 'factory', 'extension', 'on', 'mixin',
        'typedef', 'enum', 'switch', 'case', 'default', 'break', 'continue',
        'do', 'throw', 'rethrow', 'finally', 'assert', 'covariant', 'deferred',
        'external', 'sync', 'operator', 'this'
    ];
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    text = text.replace(kwRegex, '<span class="kw">$1</span>');

    // 4. Types (Primitives and Uppercase)
    const types = [
        'int', 'double', 'bool', 'num', 'String', 'List', 'Map', 'Set',
        'Future', 'Stream', 'Iterable', 'Object', 'Function', 'Type',
        'DateTime', 'Duration', 'Uri', 'RegExp', 'StackTrace', 'Error',
        'Exception', 'Widget', 'StatelessWidget', 'StatefulWidget', 'State',
        'BuildContext', 'Key', 'MaterialApp', 'Scaffold', 'Container',
        'Row', 'Column', 'Text', 'Icon', 'Button', 'ElevatedButton'
    ];
    const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
    text = text.replace(typeRegex, (match, p1, offset) => {
        const before = text.substring(0, offset);
        if (before.lastIndexOf('<') > before.lastIndexOf('>')) return match;
        if (before.lastIndexOf('\x00\x00') > before.lastIndexOf('\x00\x00', before.lastIndexOf('\x00\x00') - 1)) return match;
        return `<span class="cls">${match}</span>`;
    });

    text = text.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, (match, p1, offset) => {
        const before = text.substring(0, offset);
        if (before.lastIndexOf('<') > before.lastIndexOf('>')) return match;
        if (before.lastIndexOf('\x00\x00') > before.lastIndexOf('\x00\x00', before.lastIndexOf('\x00\x00') - 1)) return match;
        return `<span class="cls">${match}</span>`;
    });

    // 5. Highlight numbers (avoid matching inside placeholders or tags)
    text = text.replace(/\b(\d+(\.\d+)?)\b/g, (match, p1, offset) => {
        const before = text.substring(0, offset);
        if (before.lastIndexOf('<') > before.lastIndexOf('>')) return match;
        if (before.lastIndexOf('\x00\x00') > before.lastIndexOf('\x00\x00', before.lastIndexOf('\x00\x00') - 1)) return match;
        return `<span class="num">${match}</span>`;
    });

    // 6. Functions
    text = text.replace(/\b([a-z_][A-Za-z0-9_]*)(?=\s*(?:&lt;|\())/g, (match, p1, offset) => {
        if (keywords.includes(match)) return match;
        const before = text.substring(0, offset);
        if (before.lastIndexOf('<') > before.lastIndexOf('>')) return match;
        if (before.lastIndexOf('\x00\x00') > before.lastIndexOf('\x00\x00', before.lastIndexOf('\x00\x00') - 1)) return match;
        return `<span class="fn">${match}</span>`;
    });

    // 7. Operators - EXCLUDE < and > from symbols, match entities instead
    text = text.replace(/([+\-*\/%|^!?:=]+|&lt;=|&gt;=|&lt;|&gt;|&amp;&amp;|\|\||&amp;)/g, (match, p1, offset) => {
        const before = text.substring(0, offset);
        if (before.lastIndexOf('<') > before.lastIndexOf('>')) return match;
        if (before.lastIndexOf('\x00\x00') > before.lastIndexOf('\x00\x00', before.lastIndexOf('\x00\x00') - 1)) return match;
        return `<span class="op">${match}</span>`;
    });

    // 8. Restore
    for (let i = 0; i < protected.length; i++) {
        text = text.split(`\x00\x00PH${i}\x00\x00`).join(protected[i]);
    }

    return text;
}

/**
 * Simple Python to Dart translator for DSA modules
 */
function translatePythonToDart(code) {
    let dart = code
        .replace(/\/\//g, '~/') // Python floor division
        .replace(/# (.*)/g, '// $1') // Comments
        .replace(/class (\w+):/g, 'class $1 {')
        .replace(/def __init__\(self, (.*?)\):/g, 'constructor($1) {')
        .replace(/def (\w+)\(self, (.*?)\):/g, 'dynamic $1($2) {')
        .replace(/def (\w+)\((.*?)\):/g, (match, name, params) => {
            const typedParams = params.split(',').map(p => {
                const trimmed = p.trim();
                const types = { 'nums': 'List<int> nums', 'target': 'int target', 'n': 'int n', 'root': 'dynamic root', 'node': 'dynamic node' };
                return types[trimmed] || `dynamic ${trimmed}`;
            }).join(', ');
            return `dynamic ${name}(${typedParams}) {`;
        })
        .replace(/self\./g, 'this.')
        // FOR LOOPS
        .replace(/for (.*?) in range\((.*?)\):/g, (match, it, range) => {
            let parts = range.split(',').map(p => p.trim());
            let start = '0', end = '0', step = '1';
            if (parts.length === 1) { end = parts[0]; }
            else if (parts.length === 2) { start = parts[0]; end = parts[1]; }
            else if (parts.length === 3) { start = parts[0]; end = parts[1]; step = parts[2]; }
            start = start.replace(/len\((.*?)\)/g, '$1.length');
            end = end.replace(/len\((.*?)\)/g, '$1.length');
            const op = step.includes('-') ? '> ' : '< ';
            const sign = step.includes('-') ? '' : '+';
            return `for (int ${it} = ${start}; ${it} ${op}${end}; ${it} ${sign}= ${step}) {`;
        })
        .replace(/for (.*?), (.*?) in (.*?):/g, 'for (var pair _IN_ $3) { var $1 = pair[0]; var $2 = pair[1];')
        .replace(/for (.*?) in (.*?):/g, 'for (var $1 _IN_ $2) {')
        .replace(/(\b\w+(?:\.\w+)*) not in ([^:\n\)]+)/g, '!$2.contains($1)')
        .replace(/(\b\w+(?:\.\w+)*) in ([^:\n\)]+)/g, (match, k, o) => {
            if (['return', 'if', 'while', 'for', 'else', 'var'].includes(k)) return match;
            return `${o}.contains(${k})`;
        })
        .replace(/_IN_/g, 'in')
        .replace(/enumerate\((.*?)\)/g, '$1')
        // Truthy checks for common node/linked list variables
        .replace(/\b(while|if) (head|node|curr|slow|fast)(?:\.next)?(?=:|\b)/g, '$1 ($2 != null)')
        .replace(/\b(while|if) (\w+(?:\.\w+)*) and (\w+(?:\.\w+)*\.next):/g, '$1 ($2 != null && $3 != null) {')
        .replace(/\bwhile (.*?):/g, 'while ($1) {')
        .replace(/\bif (.*?):/g, 'if ($1) {')
        .replace(/\belif (.*?):/g, '} else if ($1) {')
        .replace(/\belse:/g, '} else {')
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')
        .replace(/\bnot\b/g, '!')
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false')
        .replace(/\bNone\b/g, 'null')
        .replace(/len\((.*?)\)/g, '$1.length')
        .replace(/del (\w+(?:\.\w+)*)\[(.*?)\]/g, '$1.remove($2)')
        .replace(/\.popleft\(\)/g, '.removeAt(0)')
        // TUPLE ASSIGNMENT
        .replace(/(\w+(?:\.\w+)*), (\w+(?:\.\w+)*), (\w+(?:\.\w+)*) = ([^,;\n]+), ([^,;\n]+), ([^,;\n]+)/g, '$1 = $4; $2 = $5; $3 = $6;')
        .replace(/(\w+(?:\.\w+)*), (\w+(?:\.\w+)*), (\w+(?:\.\w+)*) = ([^,\n\s]+)\.removeAt\(0\)/g, 'var entry = $4.removeAt(0); $1 = entry[0]; $2 = entry[1]; $3 = entry[2];')
        .replace(/(\w+(?:\.\w+)*), (\w+(?:\.\w+)*) = ([^,;\n]+), ([^,;\n]+)/g, '$1 = $3; $2 = $4;')
        .replace(/(\w+(?:\.\w+)*), (\w+(?:\.\w+)*) = ([^;\n]+)/g, 'var pair = $3; $1 = pair[0]; $2 = pair[1];')
        .replace(/\bdeque\((.*?)\)/g, 'List.from($1)')
        .replace(/\bheapq\.heappush\((.*?),(.*?)\)/g, '$1.add($2); $1.sort();')
        .replace(/\bheapq\.heappop\((.*?)\)/g, '$1.removeAt(0)')
        .replace(/\bset\(\)/g, '{}')
        .replace(/float\(['"]inf['"]\)/g, 'double.infinity')
        .replace(/float\(['"]-inf['"]\)/g, '-double.infinity')
        .replace(/math\.ceil\((.*?)\)/g, '($1).ceil()')
        .replace(/max\((.*?)\)/g, 'math.max($1)')
        .replace(/min\((.*?)\)/g, 'math.min($1)')
        .replace(/return (.*)/g, 'return $1;')
        .replace(/print\((.*)\)/g, 'print($1);')
        .replace(/continue\b/g, 'continue;')
        .replace(/break\b/g, 'break;')
        .replace(/append\((.*)\)/g, 'add($1)')
        .replace(/\.sort\(\)/g, '.sort()')
        .replace(/from \w+ import \w+/g, '')
        .replace(/import \w+/g, '')
        .replace(/(\w+) if (.*?) else (.*)/g, '$2 ? $1 : $3')
        .replace(/\[\]/g, '[]')
        .replace(/\{\}/g, '{}');

    // Add missing final brace to blocks if needed (very simple approach)
    // Actually, the input lines are processed one by one, so we need to track indents
    // but the current script just spits out lines.
    // I will add a check in the main loop to add closing braces based on indents.

    // Fix double math.max etc if already math.max
    dart = dart.replace(/math\.math\./g, 'math.');

    // Fix constructor names
    dart = dart.replace(/class (\w+) \{[\s\S]*?constructor/g, (match) => {
        const className = match.match(/class (\w+)/)[1];
        return match.replace('constructor', className);
    });

    // Add closing braces (primitive approach)
    const openBraces = (dart.match(/\{/g) || []).length;
    const closeBraces = (dart.match(/\}/g) || []).length;
    for (let i = 0; i < openBraces - closeBraces; i++) {
        dart += '\n}';
    }

    // Don't wrap if it already looks like a complete file
    if (dart.includes('import ') || dart.includes('void main()')) return dart;

    return `void main() {\n  // Solución traducida de Python a Dart\n  ${dart.split('\n').join('\n  ')}\n}`;
}

function getModules(htmlContent, pathPrefix) {
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    const modules = [];

    const modHeaders = document.querySelectorAll('.mod-header, .module-header');
    modHeaders.forEach(header => {
        let moduleId = header.id;
        if (!moduleId && header.previousElementSibling && header.previousElementSibling.id) {
            moduleId = header.previousElementSibling.id;
        }

        // Process code blocks inside this module context
        let current = header.nextElementSibling;
        while (current && !current.classList.contains('mod-header') && !current.classList.contains('module-header')) {
            const ideBlocks = current.querySelectorAll ? current.querySelectorAll('.ide') : [];
            ideBlocks.forEach(ide => {
                const lang = ide.querySelector('.ide-lang, .ide-filename')?.textContent || '';
                const isPython = lang.toLowerCase().includes('py');
                const fileName = ide.querySelector('.ide-filename, .ide-file')?.textContent || 'main.dart';

                const codeLines = Array.from(ide.querySelectorAll('.lc, .line-content')).map(el => {
                    // Extract text but remove the physical newlines and trailing spaces generated by the code formatter/word wrap in the HTML
                    return el.textContent.replace(/\n\s+/g, ' ');
                }).join('\n');

                let processedCode = codeLines;
                let newFileName = fileName;

                if (isPython) {
                    processedCode = translatePythonToDart(codeLines);
                    newFileName = fileName.replace('.py', '.dart');

                    // Update UI in memory
                    const langLabel = ide.querySelector('.ide-lang, .ide-lang');
                    if (langLabel) langLabel.textContent = 'Dart';
                    const fileLabel = ide.querySelector('.ide-filename, .ide-file');
                    if (fileLabel) fileLabel.textContent = newFileName;
                } else if (pathPrefix === 'flutter') {
                    processedCode = wrapDartSnippet(codeLines, fileName);
                }

                // Re-render the code block with line numbers
                const body = ide.querySelector('.ide-body');
                if (body) {
                    const lines = processedCode.split('\n');
                    let newHtml = '';
                    lines.forEach((line, idx) => {
                        const isDSA = pathPrefix === 'dsa';
                        const lineClass = isDSA ? 'cl' : 'code-line';
                        const numClass = isDSA ? 'ln' : 'line-num';
                        const contentClass = isDSA ? 'lc' : 'line-content';

                        const ext = fileName ? path.extname(fileName).toLowerCase() : '';
                        const shouldHighlight = ext === '.dart' || ext === '.py' || fileName === 'main.dart' || !fileName.includes('.');
                        const highlighted = shouldHighlight ? highlightCode(line) : line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

                        newHtml += `<div class="${lineClass}"><span class="${numClass}">${idx + 1}</span><span class="${contentClass}">${highlighted}</span></div>`;
                    });
                    body.innerHTML = newHtml;
                }
            });
            current = current.nextElementSibling;
        }

        modules.push({
            id: moduleId,
            html: header.outerHTML + (function () {
                let content = '';
                let curr = header.nextElementSibling;
                while (curr && !curr.classList.contains('mod-header') && !curr.classList.contains('module-header')) {
                    content += curr.outerHTML;
                    curr = curr.nextElementSibling;
                }
                return content;
            })()
        });
    });

    return modules;
}

const dsaPath = path.join(process.cwd(), 'public/dsa_leetcode_completo.html');
const flutterPath = path.join(process.cwd(), 'public/flutter_guide_completo.html');

const getCss = (html) => {
    const start = html.indexOf('<style>') + 7;
    const end = html.indexOf('</style>');
    let css = html.slice(start, end);

    // Clean up CSS - Remove global stuff that breaks layout
    css = css.replace(/\*\s*{[^}]*}/g, '/* Removed global reset */');
    css = css.replace(/html\s*{[^}]*}/g, '/* Removed html styles */');
    css = css.replace(/body\s*{[^}]*}/g, '/* Removed body styles */');
    css = css.replace(/\.sidebar\s*{[^}]*}/g, '/* Removed sidebar */');
    css = css.replace(/\.main\s*{[^}]*}/g, '/* Removed main */');

    // Variables are now natively dark in the source HTML files

    // Add border to ide blocks for more definition
    css = css.replace(/\.ide\s*{/g, '.ide { border: 1px solid #2a2a38; box-shadow: 0 4px 20px rgba(0,0,0,0.3); ');

    // Prefix everything to keep it in its box
    // Wrap the whole CSS in a way that it only targets #module-content-root or .module-content-container
    // A simple way is to replace selectors
    css = css.replace(/(^|\s|\}|,)([a-zA-Z0-9_\-\.\#\*\:\[\]\(\)\>\~\+\s]+)\s*\{/g, (match, separator, selector) => {
        const s = selector.trim();
        if (!s || s.startsWith('@')) return match;

        const prefixed = s.split(',').map(p => {
            const part = p.trim();
            if (part.includes('#module-content-root')) return part;
            return `#module-content-root ${part}`;
        }).join(', ');

        return `${separator}${prefixed} {`;
    });

    // Explicitly add our syntax highlighting classes and base styles
    css += `
  /* Base Container Styles */
  #module-content-root {
    background-color: var(--bg);
    color: var(--text);
    font-family: 'Sora', sans-serif;
    font-size: 14.5px;
    line-height: 1.7;
    padding: 24px;
    border-radius: 12px;
  }

  /* syntax */
  #module-content-root .kw { color: var(--keyword, #cba6f7); }
  #module-content-root .str { color: var(--string, #a6e3a1); }
  #module-content-root .num { color: var(--number, #fab387); }
  #module-content-root .cmt { color: var(--comment, #6c7086); font-style: italic; }
  #module-content-root .cls { color: var(--type, #89b4fa); }
  #module-content-root .fn { color: var(--func, #89dceb); }
  #module-content-root .op { color: var(--op, #89dceb); }
  #module-content-root .dc { color: #fab387; }
`;

    return css;
};

const dsaHtml = fs.readFileSync(path.join(__dirname, '../dsa_leetcode_completo.html'), 'utf-8');
const flutterHtml = fs.readFileSync(path.join(__dirname, '../flutter_guide_completo.html'), 'utf-8');

const dsaModulesArray = getModules(dsaHtml, 'dsa');
const flutterModulesArray = getModules(flutterHtml, 'flutter');

const dsaModuleContent = {};
dsaModulesArray.forEach(m => { dsaModuleContent[m.id] = m.html; });

const flutterModuleContent = {};
flutterModulesArray.forEach(m => { flutterModuleContent[m.id] = m.html; });

const dsaCss = getCss(dsaHtml);
const flutterCss = getCss(flutterHtml);

const content = `
export const dsaCss = \`${dsaCss}\`;
export const flutterCss = \`${flutterCss}\`;

export const dsaModuleContent = ${JSON.stringify(dsaModuleContent, null, 2)};
export const flutterModuleContent = ${JSON.stringify(flutterModuleContent, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src/lib/module-content.ts'), content);
console.log('Content extracted and converted successfully with correct exports!');
