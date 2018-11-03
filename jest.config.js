module.exports = {
    testRegex: '/specs/.*?(test)\\.js$',
    verbose: true,
    transform: { '.*': 'babel-jest' },
    collectCoverage: true,
    coverageReporters: [
        'json',
        'html',
        'text',
      ],
    collectCoverageFrom: [
      'client/components/**/*.{js,jsx}',
      '!**/node_modules/**',
    ],
  };
