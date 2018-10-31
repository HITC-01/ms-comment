module.exports = {
    verbose: true,
    transform: { '.*': 'babel-jest' },
    collectCoverage: true,
    coverageReporters: [
        'json',
        'html',
        'text',
      ],
    collectCoverageFrom: [
      '**/spec/*/*.{js,jsx}',
      '!**/node_modules/**',
    ],
  };

