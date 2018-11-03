/**
 * These rules enforce the Hack Reactor Style Guide
 *
 module.exports = {
   extends: 'airbnb'
 };
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  'parser': 'babel-eslint',
  'extends': 'airbnb',
  'env': {
    'browser': true,
    'node': true,
    'jest': true,
  },
  'plugins': [
    'react',
    'jsx-a11y',
    'import'
  ],
  'rules': {
    'react/forbid-prop-types': 'warn',
    'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx"] }],
  }
};
