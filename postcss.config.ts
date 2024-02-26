/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-05 08:57:35
 * @Description:
 */
module.exports = {
  plugins: {
    // to edit target browsers: use "browserlist" field in package.json
    "postcss-pxtorem": {
      rootValue: 100, // 结果为：设计稿元素尺寸/100，比如元素宽1920px,最终页面会换算成 19.2rem
      propList: ["*"],
      minPixelValue: 1,
    },
  },
};
