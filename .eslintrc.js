module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'prettier', // si tu utilises Prettier
  ],
  plugins: ['vue', '@typescript-eslint', 'tailwindcss'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'tailwindcss/classnames-order': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
