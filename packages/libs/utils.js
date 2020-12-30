/**
 * 判断是否是新建react文件夹
 */
const isDir = (dirType) => {
  return ['vue', 'react'].includes(dirType)
}

const isImg = (file) => {
  return /\.(jpg|jpeg|png|gif|GIF|JPG|PNG|ico)$/.test(file)
}

module.exports = {
  isDir,
  isImg
}