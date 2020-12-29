const { isDir } = require('../libs/utils')
const { generate_dir } = require('./generates/generate_dir')
const { generate_file } = require('./generates/generate_file')

// dirType react vue rf vf
const dirType = process.argv[4] || 'react'

const generate = () => {
  if (isDir(dirType)) {
    generate_dir(dirType)
  } else {
    generate_file(dirType)
  }
}

module.exports = {
  generate
}
