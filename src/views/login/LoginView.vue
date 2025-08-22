<template>
    <div class="login-container">
        <div class="login-form-wrapper">
            <div class="login-form-inner">
                <a-typography-title :level="2" class="form-title">
                    登录到 Qwen
                </a-typography-title>

                <a-form>
                    <a-form-item>
                        <a-input placeholder="Phone" size="large">
                            <template #prefix>
                                <MobileOutlined />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item>
                        <a-input-password placeholder="Paasword" size="large">
                            <template #prefix>
                                <LockOutlined />
                            </template>
                        </a-input-password>
                    </a-form-item>

                    <a-form-item>
                        <a href="#" class="forgot-password">Forgot Password</a>
                    </a-form-item>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" block size="large">
                            Login
                        </a-button>
                    </a-form-item>

                    <a-typography-text type="secondary"
                        style="display: block; text-align: center; margin-bottom: 16px;">
                        No Account? <a href="#">Register</a>
                    </a-typography-text>

                    <a-divider>or</a-divider>

                    <a-form-item>
                        <a-button block size="large" class="social-btn">
                            <template #icon>
                                <GoogleOutlined />
                            </template>
                            继续使用 Google 登录
                        </a-button>
                    </a-form-item>
                    <a-form-item>
                        <a-button block size="large" class="social-btn">
                            <template #icon>
                                <GithubOutlined />
                            </template>
                            继续使用 Github 登录]
                        </a-button>
                    </a-form-item>

                </a-form>
            </div>
            <div class="terms-text">
                <a-typography-text type="secondary">
                    您的登录即表示您接受我们的 <a href="#">用户条款</a> 和 <a href="#">隐私协议</a>
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
</script>

<style scoped>
.login-container {
    /* 使用 Flex 布局实现垂直水平居中 */
    display: flex;
    justify-content: center;
    align-items: center;

    /* 容器占满整个屏幕 */
    width: 100vw;
    height: 100vh;

    /* 设置深色背景 */
    background-color: #181818;
    color: #fff;
}

.login-form-wrapper {
    width: 400px;
    /* 或者你希望的宽度 */
}

.login-form-inner {
    background-color: #2a2a2a;
    /* 表单背景色 */
    padding: 40px;
    border-radius: 12px;
    /* 圆角 */
    margin-bottom: 24px;
}

.form-title {
    text-align: center;
    margin-bottom: 32px;
    color: #fff !important;
    /* antdv 标题组件可能需要覆盖颜色 */
}

.forgot-password {
    float: left;
    /* 或者使用 flex 布局 */
}

.social-btn {
    background-color: #3f3f3f !important;
    color: #fff !important;
    border: none !important;
}

.terms-text {
    text-align: center;
}
</style>