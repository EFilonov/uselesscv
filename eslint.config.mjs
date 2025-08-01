import pluginJs from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import prettierPlugin from 'eslint-plugin-prettier'; // ← добавить
import importPlugin from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  
  // Временно закомментируйте эту строку
  // eslintConfigPrettier,

  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Принудительно включить правило ПОСЛЕ prettier
      'semi': ['warn', 'always'],

      // React rules
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',

      // TS rules
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Import rules
      'import/no-unresolved': 'off',
      'import/no-named-as-default': 'off',
      'newline-before-return': 'off',
    },
  },

  // Next.js правила
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'off',
    },
  },

  {
    ignores: ['.next/*'],
  },
];
