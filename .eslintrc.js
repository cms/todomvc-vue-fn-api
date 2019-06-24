module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  plugins: ['prettier', 'vue'],
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint',
  },
}
