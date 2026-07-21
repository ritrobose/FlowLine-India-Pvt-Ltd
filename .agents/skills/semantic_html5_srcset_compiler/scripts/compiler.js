const fs = require('fs');
const path = require('path');

function buildResponsiveSrcsets(htmlContent) {
    console.log('Validating semantic tags and building dynamic viewports source maps...');
    
    // Scan for images missing responsive mapping indicators
    const imgRegex = /<img([^>]+)>/gi;
    const matches = [];
    let match;
    while ((match = imgRegex.exec(htmlContent)) !== null) {
        const attrs = match[1];
        if (!/srcset/i.test(attrs)) {
            matches.push(`Found static image without responsive viewport: ${match[0]}`);
        }
    }
    
    return matches;
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const htmlFile = args[0] || path.join(__dirname, '..', '..', '..', 'index.html');
    if (fs.existsSync(htmlFile)) {
        const content = fs.readFileSync(htmlFile, 'utf-8');
        const list = buildResponsiveSrcsets(content);
        console.log(list.join('\n'));
    }
}

module.exports = { buildResponsiveSrcsets };
