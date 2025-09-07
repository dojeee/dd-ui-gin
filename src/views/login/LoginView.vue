<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="login-form-inner">
        <a-typography-title :level="2" class="form-title">
          Td Site
        </a-typography-title>

        <a-form :model="form" :rules="rules" @finish="handleSubmit">
          <a-form-item name="mobile">
            <a-input
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

          <a-form-item name="verificationCode">
            <div class="sms-group">
              <a-input
                class="sms-input"
                v-model:value="form.verificationCode"
                bordered
                placeholder="བདེན་དཔང་ཨང་རྟགས།"
                size="large"
              >
              </a-input>

              <a-button
                class="sms-btn"
                :disabled="sending || countdown > 0"
                :loading="sending"
                @click="handleSendCode(form.mobile)"
                size="large"
              >
                <template v-if="countdown === 0"> ཨང་རྟགས་བསྐུར </template>
                <template v-else>
                  <span class="countdown-number">{{ countdown }}</span>
                </template>
              </a-button>
            </div>
          </a-form-item>

          <a-divider></a-divider>
          <a-form-item>
            <a-button
              class="login-btn"
              type="primary"
              html-type="submit"
              block
              size="large"
              :loading="userStore.loading"
            >
              ནང་འཛུལ།
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="terms-container">
        <a-typography-text type="secondary" class="terms-text">
          ཁྱེད་ཀྱིས་ང་ཚོའི་བེད་སྤྱོད་ཀྱི་ཆ་རྐྱེན་དང་སྒེར་གྱི་སྲིད་ཇུས་ལ་མོས་མཐུན་བྱེད་ཡོད།<a
            href="#"
            >སྤྱོད་མཁན་གྱི་ཆིངས་ཡིག།</a
          >
          དང <a href="#">གསང་བའི་སྲིད་ཇུས།</a>
        </a-typography-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeUnmount } from "vue";
import { MobileOutlined } from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/authStores";
import { message } from "ant-design-vue";
import type { LoginParams } from "@/types/auth";
import type { Rule } from "ant-design-vue/es/form";

interface FormData {
  mobile: string;
  verificationCode: string;
}

const form = reactive<FormData>({
  mobile: "",
  verificationCode: "",
});

const rules: Record<keyof FormData, Rule[]> = {
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
  verificationCode: [
    {
      required: true,
      message: "བདེན་དཔང་ཨང་རྟགས་གཞག་རོགས།",
      trigger: "change",
    },
  ],
};

const userStore = useAuthStore();

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

const validateMobile = (mobile: string): boolean =>
  /^1[3-9]\d{9}$/.test(mobile);

const handleSendCode = async (mobile: string): Promise<void> => {
  if (sending.value || countdown.value > 0) return;
  if (!validateMobile(mobile)) {
    message.warning("ཁ་པར་ཨང་གྲངས་ནོར་འདུག");
    return;
  }

  try {
    sending.value = true;
    await userStore.sendVerificationCode(mobile);
    message.success("བདེན་དཔང་ཨང་རྟགས་བསྐུར་ཟིན།");
    startCountdown(60);
  } catch (err) {
    console.error("བདེན་དཔང་ཨང་རྟགས་བསྐུར་མ་ཐུབ།", err);
    message.error("ཨང་རྟགས་བསྐུར་མ་ཐུབ། ཡང་བསྐྱར་ཚོད་ལྟ་གནང་རོགས།");
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
    console.error("登录失败:", error);
  }
};

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: var(--login-bg);
  color: var(--login-text-primary);
  transition: background 0.3s ease-in-out;
}

.login-form-wrapper {
  width: 450px;
  max-width: 90vw;
}

.login-form-inner {
  padding: 48px;
  margin-bottom: 12px;
  background: var(--login-form-bg);
  border-radius: 16px;
  border: 1px solid var(--login-form-border);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  backdrop-filter: blur(12px) saturate(150%);
}

.form-title {
  text-align: center;
  margin-bottom: 24px;
  color: var(--login-text-primary) !important;
  font-weight: 700;
  font-size: 46px !important;
  font-family: var(--font-ital), system-ui, sans-serif;
}

.sms-group {
  display: flex;
  gap: 12px;
}

.terms-container {
  text-align: center;
  font-family: var(--font-tib), system-ui, sans-serif;

  .terms-text {
    font-family: var(--font-tib), system-ui, sans-serif;
    font-size: 14px;
    color: var(--login-text-secondary);
    a {
      font-size: 12px;
      color: var(--login-primary-color);
      margin: 0 2px;
      font-weight: 600;
      transition: color 0.3s ease;

      &:hover {
        color: var(--login-primary-hover);
      }
    }
  }
}

// ========================================
// Ant Design 组件样式覆盖（统一使用 :deep）
// ========================================

:deep(.ant-form-item) {
  margin-bottom: 10px;
}

// Input 样式统一覆盖
// :deep(.ant-input-affix-wrapper),
:deep(.ant-input) {
  border-radius: v.$login-border-radius !important;
  // font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--login-primary-hover) !important;
  }

  &:focus,
  &:focus-within {
    border-color: var(--login-primary-color) !important;
    box-shadow: 0 0 0 2px var(--login-focus-shadow) !important;
  }

  &::placeholder {
    font-family: var(--font-tib), system-ui, sans-serif;
    color: var(--login-text-secondary);
    opacity: 0.8;
  }
}

// Input 内部文本颜色继承
:deep(.ant-input) {
  &::placeholder {
    font-family: var(--font-tib), system-ui, sans-serif;
    color: var(--login-text-secondary);
    opacity: 0.8;
  }
}

// 前缀图标颜色
:deep(.ant-input-prefix .anticon) {
  color: var(--login-primary-color);
}

// 主按钮样式
:deep(.ant-btn-primary) {
  background: var(--login-primary-color);
  border-color: var(--login-primary-color);
  color: #ffffff;
  font-weight: 700;
  border-radius: v.$login-border-radius;
  transition: all 0.3s ease;
  font-size: large;

  &:hover,
  &:focus {
    background: var(--login-primary-hover);
    border-color: var(--login-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(255, 138, 61, 0.2);
  }
}

// 短信验证码按钮
:deep(.sms-btn) {
  flex-shrink: 0;
  font-family: var(--font-tib), system-ui, sans-serif;
  width: 120px;
  color: var(--login-text-secondary);
  border-radius: v.$login-border-radius;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    border-color: var(--login-primary-color);
    color: var(--login-primary-color);
  }

  &:disabled {
    border-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.25);
  }
}

// 分割线
:deep(.ant-divider) {
  border-top-color: var(--login-form-border);
}

// 表单错误提示
:deep(.ant-form-item-explain-error) {
  font-family: var(--font-tib), system-ui, sans-serif;
  margin-top: 4px;
  color: #ef4444;
  /* A universal error color */
  font-size: small;
}

:deep(.countdown-number) {
  font-weight: 700;
  font-size: 16px;
  color: var(--login-text-primary);
  margin-top: 3px;
  padding: 0;
  display: inline-block;
  font-size: inherit;
}
</style>
