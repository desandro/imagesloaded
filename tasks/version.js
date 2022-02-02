const fs = require('fs');
const version = require('../package.json').version;

const file = 'imagesloaded.js';

let src = fs.readFileSync( file, 'utf8' );
src = src.replace( /imagesLoaded v\d+\.\d+\.\d+/, `imagesLoaded v${version}` );
fs.writeFileSync( file, src, 'utf8' );
