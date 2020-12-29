/**
 * 判断是否是新建react文件夹
 */
const isDir = (dirType) => {
  return ['vue', 'react'].includes(dirType)
}

module.exports = {
  isDir
}