#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const { program } = require('commander')
const initial = require('../packages/commands/initial')
const { generate } = require('../packages/commands/generate')

let config = {}

if (fs.existsSync(path.resolve('kaa.config.js'))) {
  config = require(path.resolve('kaa.config.js'))
}

// 创建
program
  .version('1.0.0', '-v, --version')
  .command('init')
  .description('initialize your kaa config')
  .action(initial)

// 新建模块 vue or react
program
  .command('new [module]/[module]-[page] [dirType]')
  .description('generate a new module')
  .action(generate)

program.parse(process.argv)
  
// console.log(process.argv)