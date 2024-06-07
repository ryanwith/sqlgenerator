// jest.config.js
module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest'
    },
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.(test|spec).js']
  };
  