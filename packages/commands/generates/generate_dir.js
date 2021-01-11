const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const { isImg } = require('../../libs/utils')

// 获取命令携带的参数
const Argv = process.argv[3] || ''

const CURRENT_DIR = process.cwd()

const generate_dir = (type) => {
  if (Argv === '') {
    console.log(chalk.yellow('[warning]: Your command should like "kaa new [module]/[module]-[page] [dirType]"'));
    return;
  }

  const nameArr = Argv.split('-')

  console.log(CURRENT_DIR, Argv)

  const dir = nameArr[0] === '$' ? '' : nameArr[0]
  const page = nameArr.length === 2 ? nameArr[1] : ''
  const moduleDir = CURRENT_DIR
  const targetPath = path.resolve(`${moduleDir}/${dir}`)

  const opts = {
    module: moduleDir,
    page,
    targetPath,
    type
  }

  copyModule(opts)
}

const copyModule = (options) => {
  // module文件夹检测是否存在，不存在则创建
  if (!fs.existsSync(options.targetPath)) {
    fs.mkdirSync(options.targetPath, { recursive: true })
  }

  // page文件夹检测是否存在，不存在则创建
  const targetPath = path.resolve(options.targetPath, options.page)
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true })
  }

  const templatePath = path.join(__dirname, '../../../', `template-dirs/${options.type}`)
  createDirectoryContents(templatePath, targetPath)
}

const createDirectoryContents = (templatePath, newDirPath) => {
  const filesToCreate = fs.readdirSync(templatePath)

  filesToCreate.forEach(file => {
    const originFilePath = `${templatePath}/${file}`

    // get stats about the current file
    const stats = fs.statSync(originFilePath)

    if (stats.isFile()) {
      let contents
      // 如果是图片格式的，则不需要传进制参数
      if (isImg(file)) {
        contents = fs.readFileSync(originFilePath)
      } else {
        contents = fs.readFileSync(originFilePath, 'utf8')
      }
      const writePath = `${newDirPath}/${file}`

      console.log(chalk.green(`Create new file: ${writePath}`))
      fs.writeFileSync(writePath, contents, 'utf8')
    } else if (stats.isDirectory()) {

      fs.mkdirSync(`${newDirPath}/${file}`);

      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newDirPath}/${file}`);
    }
  })

}

module.exports = {
  generate_dir
}
