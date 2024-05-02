// electron   获取 对文件的各种操作
const fs = require('fs')
const path = require('path')

/**
 * 获取文件夹下文件列表
 */
const getFileList = (pathNameArg) => {
  let lFiles = []
  let pathName = pathNameArg ? pathNameArg : '/Users/suarezzhu/Desktop/卷子'

  const lPromise = new Promise((resolve, reject) => {
    fs.readdir(pathName, (err, files) => {
      if (err) throw err
      resolve(files)
    })

  })
  return lPromise

}








export {
  getFileList
}
