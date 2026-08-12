const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const filesToProcess = [
  { src: 'js/security-guard.src.js', dest: 'js/security-guard.js' },
  { src: 'js/index.js', dest: 'js/index.js' }
];

const obfuscationOptions = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: false,
  renameGlobals: false,
  selfDefending: false,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.8,
  sourceMap: false,
  unicodeEscapeSequence: false
};

console.log('🔒 Starting code obfuscation and security bundling...');

filesToProcess.forEach(({ src, dest }) => {
  const srcPath = path.join(__dirname, '..', src);
  const destPath = path.join(__dirname, '..', dest);
  if (fs.existsSync(srcPath)) {
    console.log(`  -> Obfuscating: ${src} -> ${dest}`);
    const sourceCode = fs.readFileSync(srcPath, 'utf8');
    const obfuscatedResult = JavaScriptObfuscator.obfuscate(sourceCode, obfuscationOptions);
    fs.writeFileSync(destPath, obfuscatedResult.getObfuscatedCode(), 'utf8');
    console.log(`  ✓ Successfully obfuscated (Source maps disabled): ${dest}`);
  } else {
    console.warn(`  ! File not found: ${src}`);
  }
});

console.log('✅ Security obfuscation completed successfully.');
