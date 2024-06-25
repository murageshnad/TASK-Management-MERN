module.exports = {
    roots: ['<rootDir>/src', '<rootDir>/test'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transform files using babel-jest
    },
    transformIgnorePatterns: [
      'node_modules/(?!(axios)/)' // Ignore node_modules except axios
    ],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS imports
    },
  };
  