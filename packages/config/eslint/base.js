/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    'turbo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    es2022: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksConditionals: false,
        checksVoidReturn: false,
      },
    ],
    '@typescript-eslint/no-floating-promises': ['warn'],
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    indent: [1, 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    'react/no-unescaped-entities': 0,
  },
  ignorePatterns: [
    '**/.eslintrc.cjs',
    '**/*.config.js',
    '**/*.config.cjs',
    'packages/config/**',
    'dist',
    'pnpm-lock.yaml',
  ],
  reportUnusedDisableDirectives: true,
};

module.exports = config;
