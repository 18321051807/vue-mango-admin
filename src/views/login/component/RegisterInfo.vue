
<script setup lang="ts">
defineOptions({
  name: "RegisterInfo",
});
import {
  Form,
  FormItem,
  Input,
  InputPassword,
  Button,
  Checkbox,
} from "ant-design-vue";
import LoginFormTitle from "./LoginFormTitle.vue";
import VerificationCodeInput from "../modules/VerificationCodeInput.vue";
import StrengthPassword from "../modules/StrengthPassword.vue";

import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid,
} from "./useLoginTools";

const { getLoginState, handleBackLogin } = useLoginState();
const getShow = computed(
  () => unref(getLoginState) === LoginStateEnum.REGISTER
);

const formRef = ref();
const loading = ref(false);
const formData = reactive({
  account: "",
  password: "",
  confirmPassword: "",
  mobile: "",
  sms: "",
  policy: false,
});
const { getFormRules } = useFormRules(formData);

const { validForm } = useFormValid(formRef);

const handleRegister = async () => {
  const data = await validForm();
  if (!data) return;
  console.log(data);
};
</script>

<template>
  <template v-if="getShow">
    <login-form-title h="50px"></login-form-title>
    <Form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <FormItem name="account" class="enter-x">
        <Input
          class="fix-auto-fill"
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
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <verification-code-input
          v-model:value="formData.sms"
        ></verification-code-input>
      </FormItem>
      <FormItem name="password" class="enter-x">
        <strength-password
          v-model:value="formData.password"
        ></strength-password>
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <!-- <confirm-password></confirm-password> -->
        <Input.Password
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          placeholder="确认密码"
        >
        </Input.Password>
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          我同意xxx隐私政策
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        注册
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        返回
      </Button>
    </Form>
  </template>
</template>

<style lang="less" scoped></style>
