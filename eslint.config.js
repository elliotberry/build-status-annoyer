import js from "@eslint/js"
import perfectionistNatural from "eslint-plugin-perfectionist"
import is from "eslint-plugin-simple-import-sort"
import eslintPluginUnicorn from "eslint-plugin-unicorn"
export default [
  eslintPluginUnicorn.configs["flat/recommended"],

  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        console: true,
        process: true
      },
      sourceType: "module"
    },
    plugins: {
      perfectionist: perfectionistNatural,
      "simple-import-sort": is
    },

    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
      "perfectionist/sort-array-includes": "warn",
      "perfectionist/sort-astro-attributes": "warn",
      "perfectionist/sort-classes": "warn",
      "perfectionist/sort-enums": "warn",
      "perfectionist/sort-exports": "warn",
      "perfectionist/sort-imports": "warn",
      "perfectionist/sort-interfaces": "warn",
      "perfectionist/sort-jsx-props": "warn",
      "perfectionist/sort-maps": "warn",
      "perfectionist/sort-named-exports": "warn",
      "perfectionist/sort-named-imports": "warn",
      "perfectionist/sort-object-types": "warn",
      "perfectionist/sort-objects": "warn",
      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": "warn",
      "unicorn/consistent-function-scoping": "warn",
      "unicorn/no-array-callback-reference": "warn",
      "unicorn/no-null": "warn",
      "unicorn/no-process-exit": "off",
      "unicorn/prefer-switch": "off",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prevent-abbreviations": "warn"
    }
  }
]
