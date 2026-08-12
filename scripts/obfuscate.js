const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const filesToObfuscate = [
  'js/security-guard.js',
  'js/index.js'
];

const obfuscationOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: false,
  debugProtection: true,
  debugProtectionInterval: 2500,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  selfDefending: true,
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

filesToObfuscate.forEach((filePath) => {
  const absolutePath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(absolutePath)) {
    console.log(`  -> Obfuscating: ${filePath}`);
    const sourceCode = fs.readFileSync(absolutePath, 'utf8');
    const obfuscatedResult = JavaScriptObfuscator.obfuscate(sourceCode, obfuscationOptions);
    fs.writeFileSync(absolutePath, obfuscatedResult.getObfuscatedCode(), 'utf8');
    console.log(`  ✓ Successfully obfuscated (Source maps disabled): ${filePath}`);
  } else {
    console.warn(`  ! File not found: ${filePath}`);
  }
});

console.log('✅ Security obfuscation completed successfully.');
