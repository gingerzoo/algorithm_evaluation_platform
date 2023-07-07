const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [{ plugin: CracoLessPlugin }],
  devServer: {
    port: 3000 // 指定要使用的端口号
  }
};
