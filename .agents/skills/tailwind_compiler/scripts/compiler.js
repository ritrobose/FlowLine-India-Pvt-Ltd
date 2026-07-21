const fs = require('fs');
const path = require('path');

function compileWebflowCSSToTailwind(cssContent) {
    console.log('Compiling Webflow CSS rules to Tailwind utility classes (mock compiler)...');
    
    // Simplistic mapping dictionary
    const cssToTailwind = {
        'display: block': 'block',
        'display: flex': 'flex',
        'display: grid': 'grid',
        'display: none': 'hidden',
        'justify-content: center': 'justify-center',
        'align-items: center': 'items-center',
        'text-align: center': 'text-center',
        'font-weight: bold': 'font-bold',
        'width: 100%': 'w-full',
        'height: 100%': 'h-full',
        'position: absolute': 'absolute',
        'position: relative': 'relative',
        'margin: 0': 'm-0',
        'padding: 0': 'p-0'
    };

    const lines = cssContent.split('\n');
    let currentSelector = '';
    const mappings = {};

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.endsWith('{')) {
            currentSelector = trimmed.replace('{', '').trim();
            mappings[currentSelector] = [];
        } else if (trimmed.endsWith('}')) {
            currentSelector = '';
        } else if (currentSelector && trimmed) {
            const rule = trimmed.replace(';', '').trim();
            if (cssToTailwind[rule]) {
                mappings[currentSelector].push(cssToTailwind[rule]);
            }
        }
    });

    return mappings;
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const cssFilePath = args[0] || path.join(__dirname, '..', '..', '..', 'css', 'main.css');
    if (fs.existsSync(cssFilePath)) {
        const cssContent = fs.readFileSync(cssFilePath, 'utf-8');
        const results = compileWebflowCSSToTailwind(cssContent);
        console.log('Sample compilation results:');
        console.log(JSON.stringify(Object.fromEntries(Object.entries(results).slice(0, 15)), null, 2));
    } else {
        console.log(`CSS file not found at: ${cssFilePath}`);
    }
}

module.exports = { compileWebflowCSSToTailwind };
