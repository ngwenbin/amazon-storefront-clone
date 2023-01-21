module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": ["off"],
    "import/extensions": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "operator-linebreak": ["off"],
    "react/function-component-definition": ["off"],
    "react/require-default-props": ["off"],
    "no-shadow": ["off"],
    "spaced-comment": ["warn"],
    "import/no-unresolved": ["off"], // turn this off as it does not support path aliases
    "import/no-cycle": ["off"],
    "react/jsx-no-useless-fragment": ["off"],
    "function-paren-newline": ["warn", "multiline-arguments"],
    "jsx-a11y/anchor-has-content": "off", // disabled for i18n Trans components
    "react-hooks/exhaustive-deps": "off", // disabled as we keep client side code in hooks and it doesn't make sense to include all dependencies
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { destructuredArrayIgnorePattern: "^_" }, // ignores destructured array variables whose names begin with an underscore
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        projectDependencies: false,
      },
    ],
  },
};
