<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="login-form-inner">
        <a-typography-title :level="2" class="form-title">
          ནང་འཛུལ།
        </a-typography-title>

        <a-form :model="form" :rules="rules" @finish="handleSubmit">
          <a-form-item name="mobile">
            <a-input v-model:value="form.mobile" bordered placeholder="ཁ་པར་ཨང་གྲངས" size="large">
              <template #prefix>
                <MobileOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="verificationCode">
            <div class="sms-group">
              <a-input class="sms-input" v-model:value="form.verificationCode" bordered placeholder="བདེན་དཔང་ཨང་རྟགས།"
                size="large">
              </a-input>

              <a-button class="sms-btn" :disabled="sending || countdown > 0" :loading="sending"
                @click="handleSendCode(form.mobile)" size="large">
                <template v-if="countdown === 0">
                  ཨང་རྟགས་བསྐུར
                </template>
                <template v-else>
                  {{ countdown }}
                </template>
              </a-button>
            </div>
          </a-form-item>


          <a-divider></a-divider>
          <a-form-item>
            <a-button type="primary" html-type="submit" block size="large" :loading="userStore.loading">
              ནང་འཛུལ།
            </a-button>
          </a-form-item>

          <!-- <a-typography-text type="secondary" class="register-text"
            style="display: block; text-align: center; margin-bottom: 16px">
            རྩིས་ཁྲ་མེད། <a href="#">ད་ལྟ་ཐོ་འགོད་བྱོས།</a>
          </a-typography-text> -->
        </a-form>
      </div>
      <div class="terms-container">
        <a-typography-text type="secondary" class="terms-text">
          ཁྱེད་ཀྱིས་ང་ཚོའི་བེད་སྤྱོད་ཀྱི་ཆ་རྐྱེན་དང་སྒེར་གྱི་སྲིད་ཇུས་ལ་མོས་མཐུན་བྱེད་ཡོད།<a
            href="#">སྤྱོད་མཁན་གྱི་ཆིངས་ཡིག།</a>
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
  verificationCode: "",
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
  ]
};

const userStore = useUserStore();

// 验证码发送状态
const sending = ref(false);
const countdown = ref(0);
let timer: number | undefined = undefined;

const startCountdown = (seconds = 60) => {
  countdown.value = seconds;
  timer && clearInterval(timer);
  timer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      timer && clearInterval(timer);
      timer = undefined;
    }
  }, 1000) as unknown as number;
};

const validateMobile = (mobile: string) => {
  return /^1[3-9]\d{9}$/.test(mobile);
};

const handleSendCode = async (mobile: string) => {
  if (sending.value || countdown.value > 0) return;
  if (!validateMobile(mobile)) {
    message.warning('ཁ་པར་ཨང་གྲངས་ནོར་འདུག');
    return;
  }

  try {
    sending.value = true;
    // TODO: 在这里调用真实的发送验证码 API，例如 import { sendSms } from '@/api/auth'
    // await sendSms({ mobile: form.value.mobile });
    // 目前用 message 占位并启动倒计时
    await userStore.sendVerificationCode(mobile)
    message.success('བདེན་དཔང་ཨང་རྟགས་བསྐུར་ཟིན།');
    startCountdown(60);
  } catch (err) {
    console.error('བདེན་དཔང་ཨང་རྟགས་བསྐུར་མ་ཐུབ།', err);
    message.error('ཨང་རྟགས་བསྐུར་མ་ཐུབ། ཡང་བསྐྱར་ཚོད་ལྟ་གནང་རོགས།');
  } finally {
    sending.value = false;
  }
};

const handleSubmit = async (values: any) => {
  try {
    // 调用 store 中的登录 action
    await userStore.login({
      mobile: values.mobile,
      verificationCode: values.verificationCode,
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

  /* -- Theme Variables for Unified Styling -- */
  --primary-color: #bfba29;
  --primary-color-hover: #ff7a1a;
  --border-color: #e6e9ee;
  --border-color-hover: #ffb266;
  --focus-shadow-color: rgba(255, 138, 61, 0.15);
  --component-border-radius: 12px;
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

/* SMS code group: keep input width stable while button text/countdown changes */
.sms-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.sms-input {
  flex: 1 1 auto;
  min-width: 0;
  /* allow flex children to shrink without changing layout */
}

.sms-btn {
  width: 120px;
  /* 固定按钮宽度，避免倒计时文字改变导致输入框宽度抖动 */
  flex: 0 0 120px;
}

.terms-text a {
  color: var(--primary-color);
  text-decoration: none;
  margin: 0 4px;
  font-weight: 600;
  transition: color 0.2s ease;
}

.terms-text a:hover {
  color: var(--primary-color-hover);
}

/* Ant Design 组件深度定制 */
:deep(.ant-input-affix-wrapper),
:deep(.sms-input.ant-input) {
  background: #ffffff !important;
  border: 1px solid var(--border-color) !important;
  border-radius: var(--component-border-radius) !important;
  transition: all 0.2s ease;
}

:deep(.ant-input-affix-wrapper:hover),
:deep(.sms-input.ant-input:hover) {
  border-color: var(--border-color-hover) !important;
}

:deep(.ant-input-affix-wrapper:focus-within),
:deep(.sms-input.ant-input:focus) {
  border-color: var(--primary-color) !important;
  box-shadow: 0 0 0 2px var(--focus-shadow-color) !important;
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
  color: var(--primary-color) !important;
}

:deep(.ant-btn-primary) {
  background: var(--primary-color) !important;
  border: 1px solid var(--primary-color) !important;
  color: #ffffff !important;
  font-weight: 700;
  border-radius: var(--component-border-radius) !important;
  transition: all 0.2s ease;
}

:deep(.ant-btn-primary:hover) {
  background: var(--primary-color-hover) !important;
  border-color: var(--primary-color-hover) !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(255, 138, 61, 0.3);
}

/* -- Unified style for the SMS button -- */
:deep(.sms-btn.ant-btn) {
  background: #ffffff !important;
  border: 1px solid var(--border-color) !important;
  border-radius: var(--component-border-radius) !important;
  color: #2c3e50 !important;
  transition: all 0.2s ease;
}

:deep(.sms-btn.ant-btn:hover) {
  border-color: var(--border-color-hover) !important;
  color: var(--primary-color) !important;
}

:deep(.sms-btn.ant-btn:focus) {
  border-color: var(--primary-color) !important;
  box-shadow: 0 0 0 2px var(--focus-shadow-color) !important;
}

:deep(.sms-btn.ant-btn:disabled) {
  background: #f5f5f5 !important;
  border-color: #d9d9d9 !important;
  color: rgba(0, 0, 0, 0.25) !important;
}

:deep(.ant-divider) {
  border-color: #eef0f3 !important;
  color: #73819a;
}

.register-text {
  color: #5b6675;
}

.register-text a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 700;
}

.register-text a:hover {
  color: var(--primary-color-hover);
}
</style>
