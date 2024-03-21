<script setup lang="ts">
defineOptions({
  name: "ForgotPassword",
});
import LoginFormTitle from "./LoginFormTitle.vue";
import VerificationCodeInput from "../modules/VerificationCodeInput.vue";

import { Form, FormItem, Input, Button } from "ant-design-vue";

import { LoginStateEnum, useLoginState, useFormRules } from "./useLoginTools";
const { getLoginState, setLoginState, handleBackLogin } = useLoginState();
const getShow = computed(
  () => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD
);

const formRef = ref();
const loading = ref(false);
const formData = reactive({
  account: "",
  mobile: "",
  sms: "",
});
const { getFormRules } = useFormRules();

const handleReset = async () => {
  const form = unref(formRef);
  if (!form) return;
  await form.resetFields();
};
</script>

<template>
  <template v-if="getShow">
    <login-form-title></login-form-title>
    <Form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <FormItem name="account" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.account"
          placeholder="账号"
        />
      </FormItem>

      <FormItem name="mobile" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.mobile"
          placeholder="手机号码"
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
          @click="handleReset"
          :loading="loading"
        >
          重置
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          返回
        </Button>
      </FormItem>
    </Form>
  </template>
</template>

<style lang="less" scoped></style>
