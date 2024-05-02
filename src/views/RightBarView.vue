<!--右侧工具栏-->

<script setup>

import Avatar from '@/components/Avatar.vue'
import { Divider, Input, Space } from 'view-ui-plus'
import { computed, reactive, ref, watch } from 'vue'

const attributeName = ref('href')
const lurl = ref('https://m-tob.jd.com/user_login')

//🚀 ref本质是vue2的set get 设置
const userAttr=ref({
  name:'suarezzhu',
  age:15,
  sex:'male'
})
//🚀 reactive是使用js的proxy来实现的
// reactive的返回对象是个proxy
//🚀 不能做用于原始类型 string number boolean null undefined symbol
//   不能替换对象
//   对解构操作不友好  如 const state  =reactive （{count:0}）, let{count} =state

const time = reactive({
  timeLocal:'suzhou',
  timeDetail:'2024.5.1'
})


//🚀计算属性
const ipInfo=computed(()=>{
  return 'hello'.length
})
//getter setter
const fullName=computed({
  get(){
    return 'hello'
  },
  set(nv){

  }
})









</script>


<template>

  <div class="right-bar">
    <span>首页</span>
    <divider type="vertical"></divider>
    <span>导入书籍</span>
    <divider type="vertical"></divider>
    <!--    vue3🚀动态参数语法-->
    <a :[attributeName]='lurl'>京东读书</a>
    <!--    <a :href='lurl'>hello</a>-->
    <!--    <p>{{ attributeName }}</p>-->
    <divider type="vertical"></divider>
    <span>微信读书</span>
    <divider type="vertical"></divider>
    <avatar></avatar>
  </div>

</template>


<style lang="scss" scoped>

.right-bar {

  display: flex;
  justify-content: flex-end;
  align-items: center;

}


</style>