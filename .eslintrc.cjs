module.exports = {
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  plugins: ['react-refresh', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  globals: {
    module: true,
  },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  rules: {
    'react/prop-types': 'off',
    'react-refresh/only-export-components': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'no-console': ['error', {
      allow: ['warn', 'error', 'info'],
    }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
}
