// electron   获取 对文件的各种操作
const fs = require('fs')
const path = require('path')
const moment = require('moment')
/**
 * 获取文件夹下文件列表
 */
const getFileList = (pathNameArg) => {
  let lFiles = []
  let pathName = pathNameArg ? pathNameArg : '/Users/suarezzhu/Desktop/myData'

  const lPromise = new Promise((resolve, reject) => {
    fs.readdir(pathName, (err, files) => {
      if (err) throw err
      // resolve(files)
      const rs = getFileTime(files, pathName)
      resolve(rs)
    })

  })
  return lPromise
}

const getFileTime = (files, pathName) => {
  let rs = []
  files.forEach(file => {
    const filePath = path.join(pathName, file)
    // 获取文件的时间戳
    let lFile = fs.statSync(filePath)


    // let mTime=dateFormat(file.mTime, " yyyy mm dd h:MM:ss ")
    // let cTime=dateFormat(file.cTime, " yyyy mm dd h:MM:ss ")

    console.log(lFile,222)

    let mTime=moment(lFile.mtime).format("YYYY-MM-DD HH:mm:ss")
    let bTime=moment(lFile.birthtime).format("YYYY-MM-DD HH:mm:ss")

    rs.push({ name: file, mTime, bTime })
  })
  return rs


}


export {
  getFileList
}
