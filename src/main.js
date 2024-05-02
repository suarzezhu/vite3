import '@/assets/sassGlobalMix.scss'
import '@/assets/sassGlobalVar.scss'

import MyButton from '@/components/MyButton.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import 'view-ui-plus/dist/styles/viewuiplus.css'
import ViewUIPlus from 'view-ui-plus'
import MyMessage from '@/components/MyMessage.vue'


app.use(createPinia())

app.use(router).use(ViewUIPlus)


app.component('MyButton', MyButton)
app.mount('#app')


// 应用配置
app.config.errorHandler = (err) => {
  // ElMessage.eror('组件出错了', err)

}
// 全局注册组件

app.component('MyMessage', MyMessage)