const fs = require('fs');
const path = require('path');

async function extractWebflowDOM(url, destPath) {
    console.log(`Extracting clean Webflow DOM from ${url} to ${destPath}`);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
        let html = await response.text();

        // 1. Strip Webflow analytics and tracking script tags
        html = html.replace(/<script[^>]*src="[^"]*webflow\.js"[^>]*><\/script>/gi, '');
        html = html.replace(/<script[^>]*google-analytics\.com[\s\S]*?<\/script>/gi, '');
        
        // 2. Remove Webflow attributes from HTML and other elements
        html = html.replace(/\s*data-wf-page="[^"]*"/gi, '');
        html = html.replace(/\s*data-wf-site="[^"]*"/gi, '');
        html = html.replace(/\s*data-wf-domain="[^"]*"/gi, '');
        
        // 3. Remove Webflow badge
        html = html.replace(/<a[^>]*class="[^"]*w-webflow-badge[^"]*"[\s\S]*?<\/a>/gi, '');

        fs.writeFileSync(destPath, html, 'utf-8');
        console.log(`Cleaned HTML saved successfully to ${destPath}`);
    } catch (err) {
        console.error('Extraction error:', err.message);
    }
}

// Execute if run from command line
if (require.main === module) {
    const args = process.argv.slice(2);
    const targetUrl = args[0] || 'https://webflow.io';
    const destination = args[1] || path.join(__dirname, '..', '..', '..', 'clean_webflow.html');
    extractWebflowDOM(targetUrl, destination);
}

module.exports = { extractWebflowDOM };
