const fs = require('fs');
const path = require('path');

function scanStyleTransitions(htmlContent) {
    console.log('Scanning for Webflow animation tags and CSS transitions...');
    const results = [];
    
    // Scan for style attributes with transitions
    const transitionRegex = /style="[^"]*transition:[^"]*"/gi;
    let match;
    while ((match = transitionRegex.exec(htmlContent)) !== null) {
        results.push(`Found inline transition: ${match[0]}`);
    }
    
    return results;
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const htmlFile = args[0] || path.join(__dirname, '..', '..', '..', 'index.html');
    if (fs.existsSync(htmlFile)) {
        const content = fs.readFileSync(htmlFile, 'utf-8');
        const matches = scanStyleTransitions(content);
        console.log(matches.join('\n'));
    }
}

module.exports = { scanStyleTransitions };
