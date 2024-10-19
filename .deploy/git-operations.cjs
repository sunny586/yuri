const { execSync } = require('child_process') // 导入child_process模块的execSync函数，用于执行shell命令
const dayjs = require('dayjs') // 导入dayjs库，用于处理日期和时间

/**
 * 执行一系列Git操作
 * @param {string} GITHUB_FOLDER - GitHub仓库的本地文件夹路径
 */
function gitOperations(GITHUB_FOLDER) {
  try {
    // 添加所有更改到暂存区
    const output1 = execSync('git add .', { cwd: GITHUB_FOLDER }).toString()
    console.log(`git add . (更改添加成功 ${output1})`)
    // 检查是否有未提交的更改
    const statusOutput = execSync('git status --porcelain', { cwd: GITHUB_FOLDER })
      .toString()
      .trim()
    if (statusOutput) {
      // 如果有未提交的更改，则创建提交信息并提交
      const commitMessage = `update code yuri ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`
      const output2 = execSync(`git commit -m "${commitMessage}"`, {
        cwd: GITHUB_FOLDER,
      }).toString()
      console.log(`git commit -m "${commitMessage}" (提交成功 ${output2})`)
    } else {
      console.log(`git commit -m "${commitMessage}" (没有未提交的更改，跳过提交步骤。)`)
    }
    // 检查远程分支是否有新的提交
    const fetchOutput = execSync('git fetch', { cwd: GITHUB_FOLDER }).toString()
    console.log(`git fetch (获取远程分支更新成功 ${fetchOutput})`)
    const logOutput = execSync('git log HEAD -- origin master', { cwd: GITHUB_FOLDER })
      .toString()
      .trim()
    if (logOutput) {
      // 如果远程分支有新的提交，则拉取更新
      const output3 = execSync(`git pull --rebase`, { cwd: GITHUB_FOLDER }).toString()
      console.log(`git pull --rebase (拉取成功 ${output3})`)
    } else {
      console.log('git pull --rebase (远程分支没有新的提交，跳过拉取步骤。)')
    }
    // 检查git pull是否导致冲突
    const pullStatusOutput = execSync('git status --porcelain', { cwd: GITHUB_FOLDER })
      .toString()
      .trim()
    if (pullStatusOutput.includes('UU')) {
      console.error('git status --porcelain (拉取导致冲突，请手动解决冲突后再次提交。)')
      return
    }
    // 推送本地提交到远程仓库
    const output4 = execSync(`git push`, { cwd: GITHUB_FOLDER }).toString()
    console.log(`git push (推送成功 ${output4})`)
  } catch (error) {
    console.error(`Git操作失败: ${error.message}`) // 捕获并打印任何可能发生的错误
  }
}

module.exports = gitOperations
