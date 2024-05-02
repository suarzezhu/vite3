<script setup>

</script>

<template>
  <div class="test">
    <div class="container">
      <div class="left_float">左边的浮动元素</div>
      <div class="right_float">右边的浮动元素</div>
<!--      <div class="clearfix">这是一个用于清除浮动的元素</div>-->
    </div>

  </div>


</template>

<style lang="scss" scoped>
.test {
  .container {
    //overflow: hidden; /* 创建 BFC */
    padding: 10px;
    background-color: royalblue;
  }

  .container::after {
    content: '';
    display: block;
    clear: both;
  }

  .left_float {
    float: left;
    width: 200px;
    background-color: #f0f0f0;
  }

  .right_float {
    float: right;
    width: 200px;
    background-color: #f0f0f0;
  }

  .clearfix {
    clear: both; /* 清除浮动 */
  }

}


</style>