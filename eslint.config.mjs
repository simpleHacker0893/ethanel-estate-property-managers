import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: [
      '**/.next/**',
      '**/dist/**',
      '**/coverage/**',
      '**/node_modules/**',
      'graphify-out/**',
      // Vendored skill bundles from the agent kit: third-party templates that
      // do not meet this repo's lint contract and are not compiled here.
      '.claude/skills/**',
      '.agents/skills/**',
    ],
  },

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // AGENTS.md: "No `any` in a public interface." VALIDATION.md §2 makes this
      // a permanent merge gate from Sprint 001, so it is an error, not a warning.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',

      // Money is bigint minor units end to end (D-08). Number.parseFloat and
      // friends near a money path are the failure this rule exists to catch.
      '@typescript-eslint/no-loss-of-precision': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },

  // D-11 / D-54: a service reads another service's data only through that
  // service's contract in packages/contracts -- never by importing its internals,
  // even though several services share a pod. R-01's second tripwire.
  {
    files: ['packages/services/*/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@ethanel/services-*/src/*', '../*/src/*', '../../*/src/*'],
              message:
                'Cross-service import. Read the other service through its contract in packages/contracts (D-11). Being in the same pod changes nothing -- Postgres will refuse the read anyway.',
            },
          ],
        },
      ],
    },
  },

  // D-68: the (marketing) route group is public and must not import from any
  // authenticated app surface. A single import here is the boundary leak.
  {
    files: ['apps/web/app/(marketing)/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '**/app/(org)/**',
                '**/app/(resident)/**',
                '**/app/(landlord)/**',
                '**/app/(caretaker)/**',
                '**/app/(admin)/**',
                '@ethanel/services-*',
                '@ethanel/db',
                '@ethanel/auth',
              ],
              message:
                'The (marketing) route group is public and reads no schema (D-68). It may import from @ethanel/ui and @ethanel/contracts only.',
            },
          ],
        },
      ],
    },
  },

  // Marketing copy lives in content modules so a copy edit never touches a
  // component (marketing-site/acceptance.md criterion 12).
  {
    files: ['apps/web/app/(marketing)/_sections/**/*.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXText[value=/[^\s]{2,}(\s+[^\s]+){5,}/]',
          message:
            'Prose in a section component. Move it to apps/web/content/marketing/ and pass it as a typed prop.',
        },
      ],
    },
  },

  // Build and lint config files sit outside every tsconfig `include`, so the
  // project service cannot type them -- and they do not need type-aware rules;
  // there is no money path in a postcss config. This block must come AFTER the
  // one above: `disableTypeChecked` switches off the rules, not the parser, so
  // the project service has to be switched off by hand as well. Widening a
  // tsconfig to reach files the compiler never compiles would be the worse fix.
  {
    files: ['**/*.config.{mjs,js,ts,mts}', 'eslint.config.mjs'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      parserOptions: { projectService: false, project: null },
    },
  },

  {
    files: ['**/*.config.{ts,mts,mjs}', '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
    },
  },

  prettier,
)
