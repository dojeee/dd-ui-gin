<template>
    <div class="login-container">
        <div class="login-form-wrapper">
            <div class="login-form-inner">
                <a-typography-title :level="2" class="form-title">
                    ནང་འཛུལ།
                </a-typography-title>

                <a-form :model="form" :rules="rules" @finish="handleSubmit">
                    <a-form-item name="phone">
                        <a-input type="tel" v-model:value="form.phone" bordered placeholder="ཁ་པར་ཨང་གྲངས" size="large">
                            <template #prefix>
                                <MobileOutlined />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item name="password">
                        <a-input-password type="password" v-model:value="form.password" placeholder="གསང་གྲངས"
                            size="large">
                            <template #prefix>
                                <LockOutlined />
                            </template>
                        </a-input-password>
                    </a-form-item>

                    <a-form-item style="margin-bottom: 16px;">
                        <a href="#" class="forgot-password">གསང་གྲངས་བརྗེད་སོང་།</a>
                    </a-form-item>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" block size="large" :loading="userStore.loading">
                            ནང་འཛུལ།
                        </a-button>
                    </a-form-item>



                    <a-divider>or</a-divider>



                    <a-typography-text type="secondary" class="register-text"
                        style="display: block; text-align: center; margin-bottom: 16px;">
                        རྩིས་ཁྲ་མེད། <a href="#">ད་ལྟ་ཐོ་འགོད་བྱོས།</a>
                    </a-typography-text>
                </a-form>
            </div>
            <div class="terms-container">
                <a-typography-text type="secondary" class="terms-text">
                    ཁྱེད་ཀྱིས་ང་ཚོའི་བེད་སྤྱོད་ཀྱི་ཆ་རྐྱེན་དང་སྒེར་གྱི་སྲིད་ཇུས་ལ་མོས་མཐུན་བྱེད་ཡོད།<a
                        href="#">སྤྱོད་མཁན་གྱི་ཆིངས་ཡིག།</a> & <a href="#">གསང་བའི་སྲིད་ཇུས།</a>
                </a-typography-text>
            </div>
        </div>

        <div class=" logo-top-left">

        </div>

        <div class="info-bottom-left">

        </div>

        <div class="links-bottm-right">

        </div>

    </div>



</template>


<script setup lang='ts'>
import {
    GithubOutlined,
    GoogleOutlined,
    LockOutlined,
    MobileOutlined
} from '@ant-design/icons-vue';

import { ref } from 'vue';
import { useUserStore } from '@/stores/userStores';


const form = ref({
    phone: '',
    password: ''
});
const rules = {
    phone: [
        { required: true, message: 'ཁ་པར་ཨང་གྲངས་གཞག་རོགས།', whitespace: false, trigger: 'change', validateTrigger: 'change' },
        { pattern: /^1[3-9]\d{9}$/, message: 'ཁ་པར་ཨང་གྲངས་ཡོངས་གྲགས་མ་ཡིན།', trigger: 'change',validateTrigger: 'change' },
    ],
    password: [
        { required: true, message: 'གསང་གྲངས་གཞག་རོགས།', trigger: 'change' },
        { min: 8, message: 'གསང་གྲངས་དངོས་པོ་ཉི་ཤུ་བརྒྱད་ཡོང་།', trigger: 'change' },
        { max: 12, message: 'གསང་གྲངས་མང་ཤོས་བཅུ་གཉིས་ཡོང་།', trigger: 'change' },
    ],
};

const userStore = useUserStore();

const handleSubmit = async (values: any) => {
    try {
        // 调用 store 中的登录 action
        await userStore.login({
            phone: values.phone,
            password: values.password
        });
        // 登录成功后会自动跳转，这里不需要额外处理
    } catch (error) {
        // 错误处理已在 store 中完成，这里可以添加额外的处理逻辑
        console.error('登录失败:', error);
    }
};




</script>

<style scoped>
/* 沉稳的藏式风格 */
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #080d17;
    /* 深邃的夜空蓝 */
    color: #dcdcdc;
}

.login-form-wrapper {
    width: 450px;
    padding: 20px;
}

.login-form-inner {
    background-color: rgba(25, 28, 36, 0.8);
    padding: 48px;
    border-radius: 10px;
    /* 更柔和的暗金色边框 */
    border: 2px solid #b08e5c86;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    margin-bottom: 24px;
    backdrop-filter: blur(3px);
}

.form-title {
    text-align: center;
    margin-bottom: 32px;
    color: #b08f5c !important;
    /* 暗金色标题 */
    font-weight: 600;
    font-size: 26px !important;
}

.ant-form-item {
    margin-bottom: 18px;
}

.login-form-inner .ant-form-item:nth-of-type(2) {
    margin-top: -5px;
}

.forgot-password {
    float: left;
    /* Moved to the left */
    color: #40a9ff;
    /* Standard link color */
    transition: color 0.3s;
}

.forgot-password:hover {
    color: #69c0ff;
}

.social-btn {
    background-color: transparent !important;
    color: #dcdcdc !important;
    border: 1px solid #b08f5c !important;
    transition: background-color 0.3s, color 0.3s;
}

.social-btn:hover {
    background-color: #b08f5c !important;
    color: #080d17 !important;
}

.terms-container {
    text-align: center;
}

.terms-text {
    font-size: 10px;
    /* Adjusted for better readability */
    color: #a0a0a0;
}

.terms-text a {
    color: #b08f5c;
    text-decoration: none;
    margin: 0 4px;
    /* Added space around links */
}

/* Ant Design 组件深度定制 */
:deep(.ant-input-affix-wrapper) {
    background-color: rgba(0, 0, 0, 0.25) !important;
    border: 1px solid #b08f5c !important;
    border-radius: 8px !important;
}

:deep(.ant-input) {
    background-color: transparent !important;
    color: #dcdcdc !important;
    font-size: 16px;
}

:deep(.ant-input::placeholder) {
    color: #8c7b62 !important;
    /* 更暗的占位符颜色 */
    opacity: 0.8;
}

:deep(.ant-input-prefix .anticon) {
    color: #b08f5c !important;
}

:deep(.ant-btn-primary) {
    background: #b08f5c !important;
    border-color: #b08f5c !important;
    color: #080d17 !important;
    /* 深色文字 */
    font-weight: bold;
    border-radius: 8px !important;
    transition: all 0.3s;
}

:deep(.ant-btn-primary:hover) {
    background: #c8a97e !important;
    /* 悬停时提亮 */
}

:deep(.ant-divider) {
    border-color: #b08f5c !important;
    color: #b08f5c;
}

.register-text {
    color: #a0a0a0;
}

.register-text a {
    color: #40a9ff;
    /* Standard link color */
    text-decoration: none;
    transition: color 0.3s;
}

.register-text a:hover {
    color: #69c0ff;
}
</style>