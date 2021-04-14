const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

// 获取命令携带的参数
const Argv = process.argv[3] || ''

const CURRENT_DIR = process.cwd()

const formatFileName = (str, type) => {
  if (str.includes('.tsx') || str.includes('.vue')) {
    return str
  }

  switch(type) {
    case 'rf':
      return `${str}.tsx`
    case 'vf':
    case 'vf2':
    case 'vf2ts':
    default:
      return `${str}.vue`
  }
  // return type === 'rf' ? `${str}.tsx` : `${str}.vue`
}

const formatDir = (dirs) => {
  return dirs.join('/')
}

const generate_file = (type) => {
  if (Argv === '') {
    console.log(chalk.yellow('[warning]: Your command should like "kaa new [module]/[module]-[page] [dirType]"'));
    return;
  }

  const nameArr = Argv.split('/')
  const length = nameArr.length
  // console.log(nameArr)
  // 需要新建的文件夹名称
  const dir = length === 1 ? '' : formatDir(nameArr.slice(0, length-1))
  // 文件名
  const fileName = formatFileName(nameArr[length-1], type)
  // 模块的dir
  const moduleDir = CURRENT_DIR
  // 目标路径
  const targetPath = path.resolve(`${moduleDir}/${dir}`)

  const opts = {
    module: moduleDir,
    fileName,
    targetPath,
    type
  }

  copyFile(opts)
}

const copyFile = ({ module, fileName, targetPath, type }) => {
  // module文件夹检测是否存在，不存在则创建
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true })
  }

  let templatePath = ''

  switch(type) {
    case 'vf':
      templatePath = path.join(__dirname, '../../../', `template-files/template.vue`)
      break
    case 'rf':
      templatePath = path.join(__dirname, '../../../', `template-files/template.tsx`)
      break
    case 'vf2':
      templatePath = path.join(__dirname, '../../../', `template-files/template@2.vue`)
      break
    case 'vf2ts':
      templatePath = path.join(__dirname, '../../../', `template-files/template@2ts.vue`)
  }

  /* if (type === 'vf') {
    templatePath = path.join(__dirname, '../../../', `template-files/template.vue`)
  } else if (type === 'rf') {
    templatePath = path.join(__dirname, '../../../', `template-files/template.tsx`)
  } */

  // 复制目标文件并重命名为 fileName
  // 可以使用流来进行复制
  /* const rs = fs.createReadStream(templatePath);
  const ws = fs.createWriteStream(`${targetPath}/${fileName}`);
  rs.pipe(ws) */
  fs.copyFile(templatePath, `${targetPath}/${fileName}`, (err) => {
    if (err) {
      console.log(chalk.red(err))
    } else {
      console.log(chalk.green(`[success]: create ${targetPath}/${fileName}`))
    }
  })
}

module.exports = {
  generate_file
}
