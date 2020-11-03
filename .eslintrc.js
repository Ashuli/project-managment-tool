module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-extra-parens': 0,
    'dot-notation': 0,
    'spaced-comment': 0,
    'eol-last': 0,
    'quotes': 0,
    'operator-linebreak': 0,
    'comma-dangle': 0,
    'vue/no-side-effects-in-computed-properties': 0,
    'space-in-parens': 0,
    'no-trailing-spaces': 0,
    'space-before-blocks': 0,
    'keyword-spacing': 0,
    'no-mixed-spaces-and-tabs': 0,
    'indent': 0,
    'no-tabs': 0,
    'semi': 0,
    'indent': 0,
    'space-before-function-paren': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
