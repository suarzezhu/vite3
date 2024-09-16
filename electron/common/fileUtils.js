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
    let mTime = moment(lFile.mtime).format('YYYY-MM-DD HH:mm:ss')
    let bTime = moment(lFile.birthtime).format('YYYY-MM-DD HH:mm:ss')
    rs.push({ name: file, mTime, bTime })
  })
  return rs
}

// 读取配置文件
const readFile = (file_path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file_path, 'utf8', function(err, dataStr) {
      if (err) return reject(err.message) //读取失败
      /* application.properties  文件内容符合ini配置文件的格式，
      就可以通过ini.parse把读取到的文件转成js可识别的对象 */
      resolve(JSON.parse(dataStr.toString()))
    })
  })
}
// 更改配置文件
const writeFile = (config, file_path) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file_path, JSON.stringify(config), 'utf8', function(err) {
      if (err) return reject(err.message) //写入失败
      resolve('写入成功')
    })
  })
}
//修改配置文件
const changeFile = async (file_path, someKey, newVal) => {
  const config = await readFile(file_path)
  console.log(config,'config')
  // 修改配置项
  config[someKey] = newVal
  await writeFile(config, file_path)
}


export {
  getFileList,
  readFile,
  writeFile,
  changeFile
}
