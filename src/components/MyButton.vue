<script setup>

function clickSelf() {
  alert('im self')
  buttonClick()
}

const emit = defineEmits(['submit'])

function buttonClick() {
  emit('submit')
}

const props = defineProps({
  title: String,
  msg: Number,
  isPush: Boolean
})
console.log(props.msg, props.title)
console.log(props.isPush)

</script>

<template>

  <button @click.stop="clickSelf">
    我是自定义按钮

  </button>

</template>

<style scoped>

</style>