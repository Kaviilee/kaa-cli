const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const figlet = require('figlet')

const { isImg } = require('../libs/utils')

const CURRENT_DIR = process.cwd()

const QUESTIONS = [
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) {
        return true
      } else {
        return `Project name should only include letters, numbers, underscores and hashes.`
      }
    }
  },
  {
    name: 'project-type',
    type: 'list',
    message: 'Select your JavaScript framework',
    choices: [
      'React',
      'Vue'
    ]
  }
]

let projectName = ''

const createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath)

  console.log(filesToCreate)

  filesToCreate.forEach(file => {
    const originFilePath = `${templatePath}/${file}`

    // get stats about current file
    const stats = fs.statSync(originFilePath)

    if (stats.isFile()) {
      let contents
      // 判断文件格式是否为图片格式
      if (isImg(file)) {
        contents = fs.readFileSync(originFilePath)
      } else {
        contents = fs.readFileSync(originFilePath, 'utf8')
      }
      // rename
      if (file === '.npmignore') {
        file = '.gitignore'
      }

      const writePath = `${CURRENT_DIR}/${newProjectPath}/${file}`
      fs.writeFileSync(writePath, contents, 'utf8')
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURRENT_DIR}/${newProjectPath}/${file}`)

      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`)
    }
  })
}

const complete = () => {
  figlet('Kaa CLI', function(err, data) {
    if (err) {
      console.log(chalk.red(' Something about figlet has error!'))
    }

    console.log(chalk.yellow(data))
    console.log(chalk.green(` [success] Project ${projectName} init finished.`))
    console.log()
    console.log(' Install dependencies')
    console.log(chalk.magenta(` cd ${projectName} && yarn`))
    console.log()
    console.log(' Run the app')
    console.log(chalk.magenta(' yarn dev'))
  })
}

const getTemplateDir = (templateType) => {
  let templateDir = ''
  switch(templateType) {
    case 'No JavaScript framework':
      templateDir = 'template-react'
      break
    case 'Vue':
      templateDir = 'template-vue'
      break
    default:
      templateDir = 'template-react'
      break
  }
  return templateDir
}

module.exports = function() {
  inquirer.prompt(QUESTIONS)
    .then(answer => {
      projectName = answer['project-name']
      let templateDir = getTemplateDir(answer['project-type'])
      const templatePath = path.join(__dirname, '../../', templateDir)

      fs.mkdirSync(`${CURRENT_DIR}/${projectName}`)

      setTimeout(() => complete(), 1000)

      createDirectoryContents(templatePath, projectName)
    })
}