import { createApp } from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from './routers/index'
import { createPinia } from 'pinia'
import './styles/themes/_light.scss';
import './styles/themes/_dark.scss';
import './styles/themes/_color.scss';
import '@/styles/fonts.scss';




const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(Antd)
app.use(router)
app.mount('#app')

