<script setup>

import RightBarView from '@/views/RightBarView.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'


// const router = useRouter()
const route = useRoute()

const lUrl = computed(() => {
  console.log(route.query.url)
  return route.query.url
})


</script>

<template>

  <div>
    <right-bar-view></right-bar-view>
    <webview id="foo"
             :src=lUrl
             :httpreferrer=lUrl
             class="web-view"
    ></webview>

  </div>


</template>

<style scoped>
.web-view {
  overflow: hidden;
  position: absolute;
  top: 40px;
  display: flex;
  width: 100%;
  height: 100vh;

}


</style>