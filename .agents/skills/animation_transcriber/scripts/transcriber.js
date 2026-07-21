const fs = require('fs');
const path = require('path');

function transcribeAnimations(htmlContent) {
    console.log('Transcribing Webflow animation indicators to GSAP code...');
    
    // Search for elements containing Webflow interactive attributes
    const cardAnimationRegex = /id="([^"]*)"[^>]*class="[^"]*card[^"]*"[^>]*data-widget="card-animation"/gi;
    const hoverTriggerRegex = /id="([^"]*)"[^>]*data-role="hover-trigger"/gi;
    
    const animations = [];
    let match;

    while ((match = cardAnimationRegex.exec(htmlContent)) !== null) {
        animations.push(`gsap.from("#${match[1]}", { opacity: 0, y: 50, duration: 0.8, scrollTrigger: "#${match[1]}" });`);
    }

    while ((match = hoverTriggerRegex.exec(htmlContent)) !== null) {
        animations.push(`document.querySelector("#${match[1]}").addEventListener("mouseenter", () => {\n  gsap.to("#${match[1]} .hover", { opacity: 1, duration: 0.3 });\n});`);
    }

    return animations;
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const htmlFilePath = args[0] || path.join(__dirname, '..', '..', '..', 'index.html');
    if (fs.existsSync(htmlFilePath)) {
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
        const timelines = transcribeAnimations(htmlContent);
        console.log('Generated GSAP Animations:');
        console.log(timelines.join('\n\n'));
    } else {
        console.log(`HTML file not found: ${htmlFilePath}`);
    }
}

module.exports = { transcribeAnimations };
