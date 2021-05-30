module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript',
    'plugin:tailwind/recommended',
    'eslint-config-prettier',
    'eslint-config-prettier/vue',
    'eslint-config-prettier/@typescript-eslint',
  ],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'no-console': 'off',
    'no-var': 'error',
  },
}
