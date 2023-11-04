module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prefer-const': 'warn',
    'prefer-destructuring': 'warn',
    'default-param-last': 'warn',
    'no-useless-constructor': 'warn',
    'no-duplicate-imports': 'warn',
    'dot-notation': 'warn',
    'no-use-before-define': 'warn',
    eqeqeq: 'warn',
    'no-nested-ternary': 'warn',
    'no-else-return': 'warn',
    'spaced-comment': 'warn',
    'no-new-wrappers': 'warn',
    'import/prefer-default-export': 'warn',
    'import/first': 'warn',
    'import/extensions': 'warn',
    'no-undef': 'warn',
  },
};
