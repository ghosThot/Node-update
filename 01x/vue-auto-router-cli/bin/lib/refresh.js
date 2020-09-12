const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

module.exports = async () => {
  // 获取页面列表
  const list = 
    fs.readFileSync('./src/view')
      .filter(v => v !== 'Home.vue')
      .map(v => ({
        name: v.replace('.vue', '').toLowerCase(),
        file: v
      }))

    compile({
      list
    }, './src/router.js', './template/router.js.hbs')
    // 生成菜单
    compile({
      list
    }, './src/App.vue', './template/App.vue.hbs')

  /**
   * 
   * @param {*} meta 
   * @param {*} filePath 
   * @param {*} templatePath 
   */
  function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = readFileSync(templatePath).toString()
      const result = handleBars.compile(content)(meta)
      fs.writeFileSync(filePath, result)
    }
    console.log(chalk.red(`🚀${filePath} 创建成功`))
  }
}