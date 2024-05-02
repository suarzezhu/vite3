<script setup>
import RightBarView from '@/views/RightBarView.vue'
import { Card, Input, Space } from 'view-ui-plus'
import { computed, reactive, ref, watch } from 'vue'
import PngDoc from '@/assets/img/docx.png'
import PngPdf from '@/assets/img/pdf.png'
import PngFolder from '@/assets/img/folder.png'
import { fileLocal } from '../../fileLocal'
import testUrlImg from '/Users/suarezzhu/Desktop/mydata/壁纸/wallhaven-5w8125_3024x1964.png'


const { ipcRenderer } = require('electron')

const PngType = reactive({
  PngDoc: PngDoc,
  PngPdf: PngPdf

})
const testUrl = ref(`require('/Users/suarezzhu/Desktop/mydata/壁纸/wallhaven-5w8125_3024x1964.png')`)
const testUrl1 = ref('https://file.iviewui.com/images/image-demo-1.jpg')
const testUrl2 = ref(testUrlImg)


//定义左侧边栏
const learnTypes = reactive(fileLocal)
let recentReadList = reactive([])
let curFileType = ref('')


// 通用交互
const ipcRender = (sendName, replyName, args) => {
  ipcRenderer.send(sendName, args) //异步
  // 渲染进程监听主进程广播
  const lPromise = new Promise(resolve => {
    ipcRenderer.on(replyName, (event, data) => {
      resolve(data)
    })
  })
  return lPromise
}

//点击具体的侧边栏 返回具体的列表
//参数：具体的路径地址
const showList = async (urlName) => {
  curFileType = urlName
  const { data } = await ipcRender('getFileListByType', 'reply', { path: urlName })
  recentReadList.length = 0
  data.forEach((item) => {
    recentReadList.push({ name: item })
  })
}


//打开具体文件
const openFile = (fileName) => {
  let filePath = curFileType + '/' + fileName
  ipcRenderer.send('openFile', { filePath }) //异步
}

//计算具体的图标显示

const getFileIcon = (fileName) => {
  if (fileName.endsWith('.pdf')) {
    return PngPdf
  } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
    return PngDoc
  } else if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
    console.log(`${curFileType}/${fileName}`)
    return `${curFileType}/${fileName}`
  } else {
    return PngFolder
  }

}


</script>


<template>
  <div class="home-main">
    <div class="navBar_home">
      <div class="navBar">
        <!--        <a href="vscode://file/Users/suarezzhu/Desktop/juanzi/test.docx">计算器</a>-->
        <!--        <a href="ksoqing://open?local=/Users/suarezzhu/Documents/test.docx">计算器</a>-->
        <right-bar-view></right-bar-view>
      </div>
      <div class="navBar_home_body">
        <div class="home_search">
          <Space direction="vertical" size="large" type="flex">
            <Input search placeholder="搜索书籍">
            </Input>
          </Space>
        </div>
      </div>

    </div>

    <!--    主要内容-->
    <div class="home_page_container">
      <div>
        <div v-for="(value,key) in learnTypes"
             style="margin: 5px 0px 0px 0px;"
             class="common_font_16 common--cover"
             @click.self="showList(value)"
        >
          {{ key }}

        </div>
      </div>

      <div style="width: 70%;overflow-y: scroll;background-color: whitesmoke;">
        <div
          style="display: flex;flex-direction: row;justify-content: flex-start;flex-wrap: wrap"
        >
          <Card style="width:150px;margin: 10px"
                v-for="(item,index) in recentReadList"
          >
            <div @click="openFile(item.name)" style="text-align:center">
              <Image :src="getFileIcon(item.name)" width="80px" height="80px" />

              <h4>{{ item.name }}</h4>
            </div>
          </Card>

        </div>

        <!--        <Modal />-->
      </div>
    </div>


  </div>
</template>


<style lang="scss" scoped>

.home-main {
  overflow: hidden;

  .navBar_home {
    background: #edeef0;
    margin-bottom: 10px;
    padding-bottom: 15px;
    position: sticky;

    .navBar {
      padding-top: 15px;
      background: #edeef0;
      position: static;
      height: 10px;

    }

    .navBar_home_body {

      .home_search {
        position: relative;
        width: 80%;
        max-width: 700px;
        margin: 48px auto 0;

      }


    }

  }

  .home_page_container {
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;

    & > div {
      min-width: 100px;
      height: 600px;
      display: flex;
      margin: 10px;
      flex-direction: column;
      justify-content: flex-start
    }

  }


}


</style>
