<script setup>

const model = defineModel()

function update() {
  model.value--
}

</script>

<template>
  <div>
    model:{{ model }}
  </div>

</template>

<style scoped>

</style>