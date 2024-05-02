import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import type { ConfigEnv, UserConfig } from "vite"
import vue from '@vitejs/plugin-vue'
import electron from "vite-plugin-electron"
import renderer from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv): UserConfig => {
  console.log("env", env)
  const { command } = env
  // 是否为打包
  const isBuild = command === "build";
  return {
    plugins: [
      vue(),
      electron([
        {
          entry: 'electron/main/index.js',
          
          vite: {
            build: {
              minify: isBuild,  // 是否混淆代码
              outDir: "dist-electron/main"
            },
          },
        },
        {
          entry: 'electron/preload/index.js',
          vite: {
            build: {
              minify: isBuild,  // 是否混淆代码
              outDir: "dist-electron/preload"
            },
          },
        }
      ]),
      renderer()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
    },
    // 修改路径为相对路径
    base: './'
  }
})
