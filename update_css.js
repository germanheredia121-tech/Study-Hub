const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/dsa_leetcode_completo.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replace light theme CSS variables with dark theme CSS variables
const oldVars = `  :root {
    --bg: #fafafa;
    --bg2: #f3f4f6;
    --bg3: #ffffff;
    --sidebar: #111118;
    --sidebar-text: #a0a0b8;
    --sidebar-active: #ffffff;
    --border: #e5e7eb;
    --accent: #2563eb;
    --accent2: #059669;
    --accent3: #d97706;
    --accent4: #dc2626;
    --accent5: #7c3aed;
    --text: #111827;
    --text2: #4b5563;
    --text3: #9ca3af;
    --ide-bg: #1e1e2e;
    --ide-border: #313244;
    --ide-num: #45475a;
    --keyword: #cba6f7;
    --string: #a6e3a1;
    --number: #fab387;
    --comment: #6c7086;
    --type: #89b4fa;
    --func: #89dceb;
    --op: #89dceb;
    --var2: #cdd6f4;
  }`;

const newVars = `  :root {
    --bg: #000000;
    --bg2: #0a0a0a;
    --bg3: #111111;
    --sidebar: #000000;
    --sidebar-text: #a1a1aa;
    --sidebar-active: #ffffff;
    --border: #27272a;
    --accent: #ededed;
    --accent2: #059669;
    --accent3: #d97706;
    --accent4: #dc2626;
    --accent5: #7c3aed;
    --text: #ededed;
    --text2: #a1a1aa;
    --text3: #71717a;
    --ide-bg: #0a0a0a;
    --ide-border: #27272a;
    --ide-num: #52525b;
    --keyword: #cba6f7;
    --string: #a6e3a1;
    --number: #fab387;
    --comment: #71717a;
    --type: #89b4fa;
    --func: #89dceb;
    --op: #89dceb;
    --var2: #ededed;
  }`;

content = content.replace(oldVars, newVars);

// Also change background color of callouts
content = content.replace(/background: #eff6ff/g, 'background: #000000');
content = content.replace(/background: #f0fdf4/g, 'background: #000000');
content = content.replace(/background: #fffbeb/g, 'background: #000000');
content = content.replace(/background: #fef2f2/g, 'background: #000000');
content = content.replace(/background: #fafbff/g, 'background: #0a0a0a');
content = content.replace(/background: #f8faff/g, 'background: #0a0a0a');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Replaced light variables with Vercel dark variables in DSA HTML.");
