import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/*.css'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'arrow-parens': ['error', 'always'],
      'arrow-spacing': 'error',
      'eol-last': ['error', 'always'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'no-trailing-spaces': 'error',
      'no-console':
        process.env.NODE_ENV === 'production' ? 'error' : ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-constant-condition': 'error',
      'no-empty': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'prefer-destructuring': ['error', { array: true, object: true }],
      'no-else-return': 'error',
      'no-implicit-coercion': 'error',
      'no-useless-return': 'error',
      'no-useless-concat': 'error',
      'no-useless-escape': 'error',
      'no-loop-func': 'error',
      eqeqeq: ['error', 'always'],
      'dot-notation': 'error',
      curly: ['error', 'all'],
      camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
      'new-cap': ['error', { newIsCap: true }],
      'no-underscore-dangle': ['error', { allow: ['_id'] }],
      'max-len': [
        'warn',
        { code: 100, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreComments: true },
      ],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      'max-depth': ['warn', 4],
      'max-nested-callbacks': ['warn', 3],
      complexity: ['warn', 10],
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        React: 'readonly',
        JSX: 'readonly',
        process: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-unsafe': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/export': 'error',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/first': 'error',
      'import/no-duplicates': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/mouse-events-have-key-events': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/tabindex-no-positive': 'warn',
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
    },
  },

  {
    files: ['**/src/**/*.test.{ts,tsx}', '**/src/**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,json,css,scss,md}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      indent: 'off',
      'linebreak-style': 'off',
      quotes: 'off',
      semi: 'off',
      'comma-dangle': 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',
      'arrow-parens': 'off',
      'arrow-spacing': 'off',
      'eol-last': 'off',
      'key-spacing': 'off',
      'no-multiple-empty-lines': 'off',
      'no-trailing-spaces': 'off',
      'max-len': 'off',
    },
  },
];
