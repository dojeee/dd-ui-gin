<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="login-form-inner">
        <a-typography-title :level="2" class="form-title">
          ནང་འཛུལ།
        </a-typography-title>

        <a-form :model="form" :rules="rules" @finish="handleSubmit">
          <a-form-item name="mobile">
            <a-input
              type="tel"
              v-model:value="form.mobile"
              bordered
              placeholder="ཁ་པར་ཨང་གྲངས"
              size="large"
            >
              <template #prefix>
                <MobileOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password">
            <a-input-password
              type="password"
              v-model:value="form.password"
              placeholder="གསང་གྲངས"
              size="large"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item style="margin-bottom: 16px">
            <a href="#" class="forgot-password">གསང་གྲངས་བརྗེད་སོང་།</a>
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              block
              size="large"
              :loading="userStore.loading"
            >
              ནང་འཛུལ།
            </a-button>
          </a-form-item>

          <a-divider>or</a-divider>

          <a-typography-text
            type="secondary"
            class="register-text"
            style="display: block; text-align: center; margin-bottom: 16px"
          >
            རྩིས་ཁྲ་མེད། <a href="#">ད་ལྟ་ཐོ་འགོད་བྱོས།</a>
          </a-typography-text>
        </a-form>
      </div>
      <div class="terms-container">
        <a-typography-text type="secondary" class="terms-text">
          ཁྱེད་ཀྱིས་ང་ཚོའི་བེད་སྤྱོད་ཀྱི་ཆ་རྐྱེན་དང་སྒེར་གྱི་སྲིད་ཇུས་ལ་མོས་མཐུན་བྱེད་ཡོད།<a
            href="#"
            >སྤྱོད་མཁན་གྱི་ཆིངས་ཡིག།</a
          >
          & <a href="#">གསང་བའི་སྲིད་ཇུས།</a>
        </a-typography-text>
      </div>
    </div>

    <div class="logo-top-left"></div>

    <div class="info-bottom-left"></div>

    <div class="links-bottm-right"></div>
  </div>
</template>

<script setup lang="ts">
import { LockOutlined, MobileOutlined } from "@ant-design/icons-vue";

import { ref } from "vue";
import { useUserStore } from "@/stores/userStores";
import { message } from "ant-design-vue";

const form = ref({
  mobile: "",
  password: "",
});
const rules = {
  mobile: [
    {
      required: true,
      message: "ཁ་པར་ཨང་གྲངས་གཞག་རོགས།",
      whitespace: false,
      trigger: "change",
      validateTrigger: "change",
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "ཁྱེད་ཀྱི་ཁ་པར་ཨང་གྲངས་ནོར་འདུག",
      trigger: "change",
      validateTrigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "གསང་གྲངས་གཞག་རོགས།",
      trigger: "change",
    },
    {
      min: 8,
      message: "གསང་གྲངས་ཡིག་འབྲུ བརྒྱད ལས་ཆེ་དགོས།",
      trigger: "change",
      validateTrigger: "change",
    },
    {
      max: 15,
      message: "གསང་གྲངས་ཡིག་འབྲུ་ བཅོ་ལྔའི ་མན་ཡིན་དགོས།",
      trigger: "change",
      validateTrigger: "change",
    },
  ],
};

const userStore = useUserStore();

const handleSubmit = async (values: any) => {
  try {
    // 调用 store 中的登录 action
    await userStore.login({
      mobile: values.mobile,
      password: values.password,
    });
    // 登录成功后会自动跳转，这里不需要额外处理
  } catch (error) {
    // 错误处理已在 store 中完成，这里可以添加额外的处理逻辑
    console.error("登录失败:", error);
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
  background:
    radial-gradient(1000px 700px at 0% 20%, rgba(94, 234, 212, 0.85) 0%, rgba(94, 234, 212, 0) 60%),
    linear-gradient(135deg, #8ec5fc 0%, #c4d5ef 45%, #a7f3d0 75%, #34d399 100%);
  /* 晴朗暖色系渐变（日出暖黄 -> 柔橙 -> 天空蓝） */
  color: #2c3e50;
}
.login-form-wrapper {
  width: 450px;
  padding: 20px;
}

.login-form-inner {
  background: #ffffff;
  padding: 48px;
  border-radius: 16px;
  border: 1px solid #eef0f3;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.form-title {
  text-align: center;
  margin-bottom: 32px;
  color: #2c3e50 !important;
  font-weight: 700;
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
  color: #ff8a3d;
  font-weight: 600;
  transition: color 0.2s ease;
}

.forgot-password:hover {
  color: #ff7a1a;
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
  font-size: 12px;
  color: #5b6675;
}

.terms-text a {
  color: #ff8a3d;
  text-decoration: none;
  margin: 0 4px;
  font-weight: 600;
  transition: color 0.2s ease;
}

.terms-text a:hover {
  color: #ff7a1a;
}

/* Ant Design 组件深度定制 */
:deep(.ant-input-affix-wrapper) {
  background: #ffffff !important;
  border: 1px solid #e6e9ee !important;
  border-radius: 12px !important;
  transition: all 0.2s ease;
}

:deep(.ant-input-affix-wrapper:hover) {
  border-color: #ffb266 !important;
}

:deep(.ant-input-affix-wrapper:focus-within) {
  border-color: #ff8a3d !important;
  box-shadow: 0 0 0 2px rgba(255, 138, 61, 0.15) !important;
}

:deep(.ant-input) {
  background-color: #ffffff !important;
  color: #2c3e50 !important;
  font-size: 16px;
}

:deep(.ant-input::placeholder) {
  color: #9aa4b2 !important;
  opacity: 1;
}

:deep(.ant-input-prefix .anticon) {
  color: #ff8a3d !important;
}

:deep(.ant-btn-primary) {
  background: #ff8a3d !important;
  border: 1px solid #ff8a3d !important;
  color: #ffffff !important;
  font-weight: 700;
  border-radius: 12px !important;
  transition: all 0.2s ease;
}

:deep(.ant-btn-primary:hover) {
  background: #ff7a1a !important;
  border-color: #ff7a1a !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(255, 138, 61, 0.3);
}

:deep(.ant-divider) {
  border-color: #eef0f3 !important;
  color: #73819a;
}

.register-text {
  color: #5b6675;
}

.register-text a {
  color: #ff8a3d;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 700;
}

.register-text a:hover {
  color: #ff7a1a;
}
</style>
