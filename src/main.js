import { createApp } from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from './routers/index'




const app = createApp(App)
// 全局注册图标组件
const icons = [
    GithubOutlined,
    GoogleOutlined,
    MailOutlined,
    LockOutlined,
];

icons.forEach(icon => {
    app.component(icon.name, icon);
});




app.use(Antd);
app.use(router)
app.mount('#app')
