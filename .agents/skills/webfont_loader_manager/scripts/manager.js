const fs = require('fs');
const path = require('path');

function injectFontDisplaySwap(cssContent) {
    console.log('Injecting font-display swap settings to eliminate FOUT...');
    
    // Inject font-display: swap in font-face blocks
    const modified = cssContent.replace(/@font-face\s*\{([^}]*)\}/gi, (match, body) => {
        if (!/font-display/i.test(body)) {
            return `@font-face {\n  font-display: swap;\n${body}}`;
        }
        return match;
    });
    
    return modified;
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const cssFile = args[0] || path.join(__dirname, '..', '..', '..', 'css', 'main.css');
    if (fs.existsSync(cssFile)) {
        const content = fs.readFileSync(cssFile, 'utf-8');
        const updated = injectFontDisplaySwap(content);
        fs.writeFileSync(cssFile, updated, 'utf-8');
        console.log('CSS font face declarations optimized successfully.');
    }
}

module.exports = { injectFontDisplaySwap };
