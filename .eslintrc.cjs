module.exports = {
  parserOptions: {
    'project': ['./tsconfig.json']
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  'rules': {
    'import/extensions': [
      'error',
      'always',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ]
  },
  root: true
};
