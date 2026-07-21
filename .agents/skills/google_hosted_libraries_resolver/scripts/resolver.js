const fs = require('fs');
const path = require('path');

function resolveThirdPartyScripts(htmlContent) {
    console.log('Resolving external CDN script dependencies...');
    
    // Map CDN script hosts
    const cdnRegex = /src="https:\/\/(?:ajax\.googleapis\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net)\/[^\s"']+"/gi;
    const matches = [];
    let match;
    while ((match = cdnRegex.exec(htmlContent)) !== null) {
        matches.push(`Found third-party CDN script link: ${match[0]}`);
    }
    
    return matches;
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const htmlFile = args[0] || path.join(__dirname, '..', '..', '..', 'index.html');
    if (fs.existsSync(htmlFile)) {
        const content = fs.readFileSync(htmlFile, 'utf-8');
        const list = resolveThirdPartyScripts(content);
        console.log(list.join('\n'));
    }
}

module.exports = { resolveThirdPartyScripts };
