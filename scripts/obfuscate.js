const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const filesToProcess = [
  { src: 'js/security-guard.src.js', dest: 'js/security-guard.js' }
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
  simplify: false,
  splitStrings: false,
  stringArray: true,
  stringArrayCallsTransform: false,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.5,
  sourceMap: false,
  unicodeEscapeSequence: false
};

console.log('🔒 Running fast security build step...');

filesToProcess.forEach(({ src, dest }) => {
  const srcPath = path.join(__dirname, '..', src);
  const destPath = path.join(__dirname, '..', dest);
  if (fs.existsSync(srcPath)) {
    console.log(`  -> Fast Obfuscating: ${src} -> ${dest}`);
    const sourceCode = fs.readFileSync(srcPath, 'utf8');
    const obfuscatedResult = JavaScriptObfuscator.obfuscate(sourceCode, obfuscationOptions);
    fs.writeFileSync(destPath, obfuscatedResult.getObfuscatedCode(), 'utf8');
    console.log(`  ✓ Fast Obfuscation Complete: ${dest}`);
  }
});

console.log('✅ Build step completed successfully.');
