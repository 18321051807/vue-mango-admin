<script setup lang="ts">
defineOptions({
  name: "MobilePhoneLogin",
});
import LoginFormTitle from "./LoginFormTitle.vue";
import VerificationCodeInput from "../modules/VerificationCodeInput.vue";
import { Form, FormItem, Input, Button } from "ant-design-vue";

import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid,
} from "./useLoginTools";
const { getLoginState, handleBackLogin } = useLoginState();

const ggetShow = computed(() => unref(getLoginState) == LoginStateEnum.MOBILE);

const formRef = ref();
const loading = ref(false);

const formData = reactive({
  mobile: "",
  sms: "",
});
const { getFormRules } = useFormRules();
const { validForm } = useFormValid(formRef);

const handleLogin = async () => {
  const data = await validForm();
  if (!data) return;
  console.log(data);
};
</script>

<template>
  <template v-if="ggetShow">
    <login-form-title h="150px"></login-form-title>
    <Form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <FormItem name="mobile" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.mobile"
          placeholder="手机号码"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <verification-code-input
          v-model:value="formData.sms"
        ></verification-code-input>
      </FormItem>

      <FormItem class="enter-x">
        <Button
          type="primary"
          size="large"
          block
          @click="handleLogin"
          :loading="loading"
        >
          登陆
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          返回
        </Button>
      </FormItem>
    </Form>
  </template>
</template>

<style lang="less" scoped></style>
