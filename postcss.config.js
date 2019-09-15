const {
  sep
} = require('path')
module.exports = ({
  file
}) => {
  let vantStr = `node_modules${sep}_vant@2.2.0@vant`
  let rootValue = file.dirname.indexOf(vantStr) !== -1 ? 37.5 : 75

  // let rootValue = 37.5
  return {
    plugins: {
      'autoprefixer': {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}
