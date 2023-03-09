module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/airbnb',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': 0,
        'max-len': 'off',
        'no-mixed-operators': 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'vuejs-accessibility/click-events-have-key-events': 'off',
        'import/prefer-default-export': 'off',
    },
};
