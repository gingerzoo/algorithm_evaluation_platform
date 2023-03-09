const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [{ plugin: CracoLessPlugin }]
};
