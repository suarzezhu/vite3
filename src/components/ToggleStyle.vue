<script setup>

import { ref } from 'vue'

const curValue = ref(true)

const change= (status)=>{
  this.$Message.info('开关状态：' + status);
}

</script>

<template>
  <div>
    <Switch v-model="curValue" @on-change="change" />

  </div>

</template>

<style scoped>

</style>