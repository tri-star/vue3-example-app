module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript',
    'plugin:tailwind/recommended',
    'plugin:prettier/recommended',
    'prettier/vue',
    'prettier/@typescript-eslint',
  ],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'no-console': 'off',
    'no-var': 'error',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        printWidth: 120,
      },
    ],
  },
}
