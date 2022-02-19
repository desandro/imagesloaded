/* globals Promise */

const cheerio = require('cheerio');
const { execSync } = require('child_process');
const fs = require('fs');
const { marked } = require('marked');

const copyFiles = [
  'imagesloaded.js',
  'imagesloaded.pkgd.js',
  'imagesloaded.pkgd.min.js',
];

let fileSrcs = {};

let srcFilesPromises = [
  'README.md',
  'html/page.html',
  'html/github-button.html',
  'html/demo.html',
  'html/sponsored.html',
].map( ( srcFile ) => new Promise( function( resolve, reject ) {
  fs.readFile( srcFile, 'utf8', function( err, src ) {
    if ( err ) return reject( err );
    fileSrcs[ srcFile ] = src;
    resolve();
  } );
} ) );

Promise.all( srcFilesPromises )
  .then( function() {
    let readmeHtml = marked( fileSrcs['README.md'] );
    let html = fileSrcs['html/page.html']
      .replace( '{{{ content }}}', readmeHtml )
      .replace( '<!-- github-button -->', fileSrcs['html/github-button.html'] )
      .replace( '<!-- demo -->', fileSrcs['html/demo.html'] )
      .replace( '<!-- sponsored -->', fileSrcs['html/sponsored.html'] );

    let $ = cheerio.load( html, {
      decodeEntities: false,
    } );

    let pageNavHtml = '\n';
    $('#content h2').each( function( i, header ) {
      let $header = $( header );
      pageNavHtml += `
        <li class="page-nav__item page-nav__item--${header.name}">
          <a href="#${$header.attr('id')}">${$header.text()}</a>
        </li>`;
    } );
    pageNavHtml = `<div class="page-nav">${pageNavHtml}</div>`;
    html = html.replace( '<!-- page-nav -->', pageNavHtml );

    execSync(`mkdir -p build`);
    fs.writeFileSync( 'build/index.html', html );

    execSync(`cp ${copyFiles.join(' ')} build/`);
  } );
