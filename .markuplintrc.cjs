module.exports = {
  extends: ["markuplint:recommended"],
  parser: {
    ".html$": "@markuplint/html-parser",
  },
  specs: ["@markuplint/html-spec"],
};
