/* eslint-env node */

module.exports = {
  plugins: [ 'metafizzy' ],
  extends: 'plugin:metafizzy/browser',
  env: {
    browser: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  globals: {
    imagesLoaded: 'readonly',
    QUnit: 'readonly',
  },
  rules: {
    eqeqeq: [ 'error', 'smart' ],
    'id-length': [ 'error', {
      min: 2,
      max: 30,
      exceptions: [ 'x', 'y', 'z', 'i', 'j', 'a', 'b', 't', '$' ],
    } ],
    'new-cap': 'off',
  },
  ignorePatterns: [ '*pkgd*.js' ],
};
