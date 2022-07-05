module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'rules': {
        'comma-dangle': [1, {
            'objects': 'always',
            'arrays': 'ignore',
            'imports': 'ignore',
            'exports': 'ignore',
            'functions': 'ignore',
        }],
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'quotes': [2, 'single', { 'avoidEscape': true, }],
    },
}
