module.exports = {
  plugins: {
    /*   // 生成浏览器样式规则前缀
          'autoprefixer': {
              browsers: ['Android >= 4.0', 'iOS >= 8']
          }, */
    //   把px转换为rem
    'postcss-pxtorem': {

      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的css属性
      propList: ['*']
    }
  }
}
