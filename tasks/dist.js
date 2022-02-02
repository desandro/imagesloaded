const fs = require('fs');
const { execSync } = require('child_process');
const { minify } = require('terser');

const indexPath = 'imagesloaded.js';
const distPath = 'imagesloaded.pkgd.js';
const distMinPath = 'imagesloaded.pkgd.min.js';

let indexContent = fs.readFileSync( `./${indexPath}`, 'utf8' );

let paths = [
  'node_modules/ev-emitter/ev-emitter.js',
  'imagesloaded.js',
];

// concatenate files
execSync(`cat ${paths.join(' ')} > ${distPath}`);

// add banner
let banner = indexContent.split(' */')[0] + ' */\n\n';
banner = banner.replace( 'imagesLoaded', 'imagesLoaded PACKAGED' );
let distJsContent = fs.readFileSync( distPath, 'utf8' );
distJsContent = banner + distJsContent;
fs.writeFileSync( distPath, distJsContent );

// minify
( async function() {
  let { code } = await minify( distJsContent, { mangle: true } );
  fs.writeFileSync( distMinPath, code );
} )();
