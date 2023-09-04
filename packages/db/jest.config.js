module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: { warnOnly: true },
    },
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};
