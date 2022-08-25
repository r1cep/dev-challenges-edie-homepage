module.exports = {
  extends: [
    // prettierの折り返し防止用コメント
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
  ],
  plugins: ["stylelint-order"],
  rules: {
    "order/order": ["custom-properties", "declarations"],
    "selector-class-pattern": [
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*(__)*([a-z][a-z0-9]*)(-[a-z0-9]+)*(--)*([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      {
        message: "Expected class name to be BEM",
      },
    ],
  },
};
