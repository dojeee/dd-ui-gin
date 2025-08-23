import { createApp } from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from './routers/index'
import { createPinia } from 'pinia'




const app = createApp(App)
const pinia = createPinia()
app.use(Antd)
app.use(pinia)
app.use(router)
app.mount('#app')
