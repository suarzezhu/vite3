/**
 * @name: localOprea
 * @author: suarezzhu
 * @date: 2024/4/30 下午11:22
 * @description：localOprea
 * @update: 2024/4/30 下午11:22
 */

const { spawn,exec } = require('child_process');

function runAppInBackground(exePath) {
  const options = {
    detached: true,
    windowsHide: true
  };

  const child = spawn(exePath, [], options);

  child.unref(); // 让子进程独立运行，使其不受主进程关闭的影响
}


function openProgram(path){
// 替换为你想要打开的文档的路径
  const filePath = path;

// 使用默认程序打开文档
  exec(`open ${path}`);


}





export {
  runAppInBackground,
  openProgram
}

