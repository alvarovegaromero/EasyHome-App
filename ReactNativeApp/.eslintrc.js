/* eslint-disable prettier/prettier */
module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'],
  rules: {
    'max-len': ['error', { code: 100 }],
    "react/react-in-jsx-scope": "off"
  },
};