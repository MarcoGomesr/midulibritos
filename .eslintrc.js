module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["standard-with-typescript", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/promise-function": "off",
    "@typescript-eslint/no-float-promises": "off"
  }
}