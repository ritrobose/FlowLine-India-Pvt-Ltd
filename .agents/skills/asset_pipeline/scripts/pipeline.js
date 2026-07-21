const fs = require('fs');
const path = require('path');

async function processAssetPipeline(htmlFilePath, outputAssetsDirName) {
    console.log(`Processing asset pipeline for ${htmlFilePath}...`);
    try {
        if (!fs.existsSync(htmlFilePath)) {
            throw new Error(`File not found: ${htmlFilePath}`);
        }
        
        let html = fs.readFileSync(htmlFilePath, 'utf-8');
        const workspaceDir = path.dirname(htmlFilePath);
        const assetsDir = path.join(workspaceDir, outputAssetsDirName);
        
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }
        
        // Find all remote image URLs (e.g. from Webflow cdn)
        const urlRegex = /https:\/\/(?:cdn\.prod\.website-files\.com|s3\.amazonaws\.com\/webflow-prod-assets)\/[^\s"']+\.(?:png|jpg|jpeg|gif|svg|webp|woff|woff2)/gi;
        
        const urls = [...new Set(html.match(urlRegex))];
        console.log(`Found ${urls.length} remote assets to download.`);
        
        for (const url of urls) {
            const basename = path.basename(url.split('?')[0]);
            const destPath = path.join(assetsDir, basename);
            
            console.log(`Downloading ${url} -> ${destPath}`);
            try {
                const res = await fetch(url);
                if (res.ok) {
                    const buf = await res.arrayBuffer();
                    fs.writeFileSync(destPath, Buffer.from(buf));
                    // Rewrite in html
                    const localPath = `/${outputAssetsDirName}/${basename}`;
                    html = html.split(url).join(localPath);
                }
            } catch (dlErr) {
                console.error(`Failed to download asset ${url}:`, dlErr.message);
            }
        }
        
        fs.writeFileSync(htmlFilePath, html, 'utf-8');
        console.log(`Updated asset paths in ${htmlFilePath}`);
    } catch (err) {
        console.error('Asset pipeline error:', err.message);
    }
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const htmlFile = args[0] || path.join(__dirname, '..', '..', '..', 'index.html');
    const assetFolder = args[1] || 'public/assets';
    processAssetPipeline(htmlFile, assetFolder);
}

module.exports = { processAssetPipeline };
