module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-recess-order',
  ],
  rules: {
    'order/properties-alphabetical-order': null,
    'scss/at-import-partial-extension-blacklist': null,
    'selector-max-id': null,
    'scss/at-extend-no-missing-placeholder': null,
    'selector-class-pattern': null,
  },
  defaultSeverity: 'warning',
};
