module.exports = {
    'extends': 'google',
    'parserOptions': {
        'ecmaVersion': 6,
    },
    'rules': {
        'array-bracket-spacing': ['error', 'never'],
        'brace-style': ['error', '1tbs'],
        'camelcase': ['error', {'properties': 'always'}],
        'indent': ['error', 4],
        'no-console': ['warn'],
        'no-debugger': ['warn'],
        'no-trailing-spaces': ['error'],
        'padded-blocks': ['off'],
        'quote-props': ['error', 'always'],
        'semi': ['error', 'never'],
    }

}
