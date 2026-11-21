import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    // Static assets and vendored libraries are not application source.
    'public/**',
    'assets/**',
    // Legacy scaffold, retained as history. Not imported by src/main.jsx.
    'src/App.jsx',
    'src/Layout.jsx',
    'src/components/**',
    'src/context/**',
    'src/hooks/**',
    'src/lib/**',
    'src/pages/**',
    'src/constants/**',
    'tailwind.config.js',
  ]),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Core no-unused-vars cannot see JSX usage without eslint-plugin-react.
      // Capitalized identifiers are components or imports kept for JSX.
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]' },
      ],
      // This app intentionally co-locates hooks and helpers with components.
      'react-refresh/only-export-components': 'off',
    },
  },
])
