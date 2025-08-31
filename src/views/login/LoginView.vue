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
import { reactive, ref, onBeforeUnmount } from 'vue';
import { MobileOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/stores/userStores';
import { message } from 'ant-design-vue';
import type { LoginParams } from '@/types/auth';
import type { Rule } from 'ant-design-vue/es/form';

interface FormData {
  mobile: string;
  verificationCode: string;
}

const form = reactive<FormData>({
  mobile: '',
  verificationCode: '',
});

const rules: Record<keyof FormData, Rule[]> = {
  mobile: [
    {
      required: true,
      message: 'ཁ་པར་ཨང་གྲངས་གཞག་རོགས།',
      whitespace: false,
      trigger: 'change',
      validateTrigger: 'change',
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: 'ཁྱེད་ཀྱི་ཁ་པར་ཨང་གྲངས་ནོར་འདུག',
      trigger: 'change',
      validateTrigger: 'change',
    },
  ],
  verificationCode: [
    {
      required: true,
      message: 'བདེན་དཔང་ཨང་རྟགས་གཞག་རོགས།',
      trigger: 'change',
    },
  ],
};

const userStore = useUserStore();

// 验证码发送状态
const sending = ref(false);
const countdown = ref(0);
let timer: ReturnType<typeof setInterval> | undefined = undefined;

const startCountdown = (seconds = 60): void => {
  countdown.value = seconds;
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      if (timer) clearInterval(timer);
      timer = undefined;
    }
  }, 1000);
};

const validateMobile = (mobile: string): boolean => /^1[3-9]\d{9}$/.test(mobile);

const handleSendCode = async (mobile: string): Promise<void> => {
  if (sending.value || countdown.value > 0) return;
  if (!validateMobile(mobile)) {
    message.warning('ཁ་པར་ཨང་གྲངས་ནོར་འདུག');
    return;
  }

  try {
    sending.value = true;
    await userStore.sendVerificationCode(mobile);
    message.success('བདེན་དཔང་ཨང་རྟགས་བསྐུར་ཟིན།');
    startCountdown(60);
  } catch (err) {
    console.error('བདེན་དཔང་ཨང་རྟགས་བསྐུར་མ་ཐུབ།', err);
    message.error('ཨང་རྟགས་བསྐུར་མ་ཐུབ། ཡང་བསྐྱར་ཚོད་ལྟ་གནང་རོགས།');
  } finally {
    sending.value = false;
  }
};

const handleSubmit = async (values: LoginParams): Promise<void> => {
  try {
    await userStore.login({
      mobile: values.mobile,
      verificationCode: values.verificationCode,
    });
  } catch (error) {
    console.error('登录失败:', error);
  }
};

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as v;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: v.$gradient-bg-content;
  /* 晴朗暖色系渐变（日出暖黄 -> 柔橙 -> 天空蓝） */
  color: #2c3e50;
}

.login-form-wrapper {
  width: 450px;
  max-width: 90vw;
}

.login-form-inner {
  background: #ffffff;
  padding: 48px;
  border-radius: 16px;
  border: 1px solid #eef0f3;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 14px;

  /* CSS变量用于深度样式 */
  --primary-color: #{v.$login-primary-color};
  --primary-color-hover: #{v.$login-primary-hover};
  --border-color: #{v.$login-border-color};
  --border-color-hover: #{v.$login-border-hover};
  --focus-shadow-color: #{v.$login-focus-shadow};
  --component-border-radius: #{v.$login-border-radius};
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

.terms-container {
  text-align: center;
}

.terms-text {
  font-size: 12px;
  color: #5b6675;

  a {
    color: rgb(56, 117, 246);
    text-decoration: none;
    margin: 0 1px;
    font-weight: 600;
    transition: color 0.4s ease;

    &:hover {
      color: var(--primary-color-hover);
    }
  }
}

.sms-group {
  display: flex;
  gap: 12px;
  align-items: center;

  .sms-input {
    flex: 1 1 auto;
    min-width: 0;
  }

  .sms-btn {
    flex: 0 0 auto;
    width: 120px;
    white-space: nowrap;
  }
}

:deep(.ant-input-affix-wrapper),
:deep(.ant-input) {
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: var(--component-border-radius);
  color: #2c3e50;
  font-size: 16px;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--border-color-hover);
  }

  &:focus,
  &:focus-within {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--focus-shadow-color);
  }

  &::placeholder {
    color: #9aa4b2;
    opacity: 1;
  }
}

:deep(.ant-input-prefix .anticon) {
  color: var(--primary-color);
}

:deep(.ant-btn-primary) {
  background: var(--primary-color);
  border: 1px solid var(--primary-color);
  color: #ffffff;
  font-weight: 700;
  border-radius: var(--component-border-radius);
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-color-hover);
    border-color: var(--primary-color-hover);
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(255, 138, 61, 0.3);
  }
}

:deep(.sms-btn) {
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: var(--component-border-radius);
  color: #2c3e50;
  transition: all 0.2s ease;
  flex: 0 0 auto;
  width: 120px;
  white-space: nowrap;
  min-width: 120px;

  &:hover:not(:disabled) {
    border-color: var(--border-color-hover);
    color: var(--primary-color);
  }

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--focus-shadow-color);
  }

  &:disabled {
    background: #f5f5f5;
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.25);
  }
}

:deep(.ant-divider) {
  border-color: #eef0f3;
  color: #73819a;
}

.register-text {
  color: #5b6675;

  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 700;
    transition: color 0.2s ease;

    &:hover {
      color: var(--primary-color-hover);
    }
  }
}
</style>
