<script setup>
import RightBarView from '@/views/RightBarView.vue'
import { Card, Input, Space } from 'view-ui-plus'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import PngDoc from '@/assets/img/docx.png'
import PngPdf from '@/assets/img/pdf.png'
import PngFolder from '@/assets/img/folder.png'
import PngIcon from '@/assets/img/icon.png'
import PngList from '@/assets/img/list.png'
import PngSort from '@/assets/img/sort.png'
import PngMedia from '@/assets/img/media.png'
import { fileLocal } from '../../fileLocal'
import testUrlImg from '/Users/suarezzhu/Desktop/mydata/壁纸/wallhaven-5w8125_3024x1964.png'


const { ipcRenderer } = require('electron')

const PngType = reactive({
  PngDoc: PngDoc,
  PngPdf: PngPdf

})

onMounted(() => {

  let rs = handleGetFile('/Users/suarezzhu/Desktop/mydata/壁纸')

})

const handleGetFile = async (folderPath) => {
  return await ipcRenderer.invoke('get-images', folderPath)
}


//列表头
const columns = [
  {
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
  },
  {
    title: '名称',
    key: 'name',
    sortable: true,
    width: 800

  },
  {
    title: '时间',
    key: 'time'
  }
]


//定义左侧边栏
const learnTypes = reactive(fileLocal)
let recentReadList = reactive([])
let curFileType = ref('')
let curFolderSTatus = ref(1)


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
  if (typeof fileName === 'object') {
    fileName = fileName.name
  }

  if (fileName.split('.')[1]) {
    let filePath = curFileType + '/' + fileName
    ipcRenderer.send('openFile', { filePath }) //异步
  } else {
    curFileType = curFileType + '/' + fileName
    showList(curFileType)

  }
}

//计算具体的图标显示

const getFileIcon = (fileName) => {
  if (fileName.endsWith('.pdf')) {
    return PngPdf
  } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
    return PngDoc
  } else if (fileName.endsWith('.mp4') || fileName.endsWith('.wmv')) {
    return PngMedia
  } else if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
    let lUrl = `myapp://${curFileType}/${fileName}`
    return lUrl
  } else {
    return PngFolder
  }
}
const ifImage = (fileName) => {
  if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
    return true
  } else return false
}
/**
 * 更改文件夹的显示
 * @type {string} 1 图标 2 列表 3排序
 */
const changeFolderState = (status) => {

  switch (status) {
    case 1:
      curFolderSTatus.value = 1
      return
    case 2:
      curFolderSTatus.value = 2
      return
    case 3:
      curFolderSTatus.value = 3
      return
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

    <div class="operate__bar">
      <img alt="图标" @click="changeFolderState(1)" :src="PngIcon">
      <img alt="列表" @click="changeFolderState(2)" :src="PngList">
      <img alt="排序" @click="changeFolderState(3)" :src="PngSort">
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

      <div class="content">
        <!--        图标显示格式-->
        <div
          v-if="curFolderSTatus==1"
          style="display: flex;flex-direction: row;justify-content: flex-start;flex-wrap: wrap"
        >
          <Card style="width:150px;margin: 10px;cursor: pointer"
                v-for="(item,index) in recentReadList"
          >
            <div @click="openFile(item.name)" style="text-align:center">
              <Tooltip max-width="200" :content="item.name">
                <Image fit="cover" :src="getFileIcon(item.name)" width="80px" height="80px" />
                <div v-if="!ifImage(item.name)" class="common--remark">{{ item.name }}</div>
              </Tooltip>
            </div>
          </Card>
        </div>

        <div
          v-if="curFolderSTatus==2">
          <!--        列表显示格式-->
          <!--          <template v-for="(item,index) in recentReadList">-->
          <!--            <div @click="openFile(item.name)">{{ item.name }}</div>-->
          <!--          </template>-->


          <!--          <List  border>-->
          <!--            <ListItem-->
          <!--              class="list&#45;&#45;click"-->
          <!--              v-for="(item,index) in recentReadList"-->
          <!--              @dblclick="openFile(item.name)"-->
          <!--            >{{ item.name }}-->
          <!--            </ListItem>-->

          <!--          </List>-->


          <Table
            stripe
            @on-row-click="openFile"
            highlight-row
            border ref="selection"
            :columns="columns"
            :data="recentReadList"></Table>


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
      background: #edeef0;
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

  .operate__bar {
    height: 30px;
    width: 100%;
    padding: 0px 20px 0px 10px;

    & img {
      float: right;
      width: 20px;
      height: 20px;
      cursor: pointer;

      img :hover {
        color: lawngreen;
      }
    }

  }


  .home_page_container {
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    height: 700px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    & > div {
      min-width: 100px;
      display: flex;
      margin: 10px;
      flex-direction: column;
      justify-content: flex-start
    }

    .content {
      width: 85%;
      overflow-y: scroll;
      background-color: whitesmoke;

      .list--click {
        cursor: pointer;
        font-weight: bold;

        &:hover {
          color: cornflowerblue;
        }
      }

    }


  }


}


</style>
