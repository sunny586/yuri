// 定义GitHub文件夹的路径
const GITHUB_FOLDER = '/Users/zhangyu/Desktop/zhangyu/github/sunny586.github.io'

// 引入fs-extra模块，提供文件系统操作功能
const fs = require('fs-extra')
// 引入path模块，用于处理和转换文件路径
const path = require('path')
// 引入自定义的git操作模块
const gitOperations = require('./git-operations.cjs')
// 定义源文件夹路径，指向当前目录的上级目录中的dist文件夹
const sourceFolder = path.resolve(__dirname, '../dist')
// 定义目标文件夹路径，指向GitHub文件夹中的yuri文件夹
const targetFolder = `${GITHUB_FOLDER}/yuri_dist`

async function run() {
  try {
    // 清空目标文件夹
    await fs.emptyDir(targetFolder)
    // 将源文件夹移动到目标文件夹，并覆盖同名文件
    await fs.move(sourceFolder, targetFolder, { overwrite: true })
    // 执行git操作
    gitOperations(GITHUB_FOLDER)
  } catch (error) {
    // 如果过程中发生错误，打印错误信息
    console.error(`流程失败: ${error.message}`)
  }
}

// 调用主运行函数
run()
