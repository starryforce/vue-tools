module.exports = {
  '*.js': [
    'eslint --fix',
    'prettier --write',
    'git add',
    'yarn unit --bail --findRelatedTests',
  ],
  '{*.json,*.code-snippets}': ['prettier --write --parser json', 'git add'],
  '*.vue': [
    'eslint --fix',
    'stylelint --fix',
    'prettier --write',
    'git add',
    'yarn unit --bail --findRelatedTests',
  ],
  '*.scss': ['stylelint --fix', 'prettier --write', 'git add'],
  '*.md': ['markdownlint', 'prettier --write', 'git add'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add'],
}
