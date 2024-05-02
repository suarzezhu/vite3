<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="myClose">关闭</button>
    <p>点击关闭按钮关闭桌面应用</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { ipcRenderer } from "electron"
import { join } from "node:path"

const myClose = () => {
  ipcRenderer.invoke("quit")
}

onMounted(() => {
  const url = join(import.meta.url, "./");
  console.log(url)
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
