<script setup lang="ts">
defineOptions({
  name: "FormTabs",
});
import LoginFormTitle from "./LoginFormTitle.vue";

import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid,
} from "./useLoginTools";

import {
  Form,
  FormItem,
  Input,
  InputPassword,
  Button,
  Checkbox,
  Row,
} from "ant-design-vue";

import { useUserStore } from "@/store/modules/user";

interface FormState {
  account: string;
  password: string;
}

import { UnwrapRef } from "vue";
const formRef = ref();
const rememberMe = ref(false);
const loading = ref(false);
const formData: UnwrapRef<FormState> = reactive({
  account: "admin",
  password: "123456",
});

const { getLoginState, setLoginState } = useLoginState();

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

const { getFormRules } = useFormRules();

const { validForm } = useFormValid(formRef);
const userStore = useUserStore();

const router = useRouter();
const handleLogin = async () => {
  const data = await validForm();
  if (!data) return;
  try {
    loading.value = true;
    const res: any = await userStore.login({
      password: data.password,
      username: data.account,
    });
    console.log(res, "userInfo");
    if (res.status == "200") {
      router.push("/home");
    }
  } catch (error) {
    console.log(error, "error");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <login-form-title h="130px" v-show="getShow"></login-form-title>
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    @keypress.enter="handleLogin"
    v-show="getShow"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        placeholder="请输入..."
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        placeholder="请输入密码..."
      />
    </FormItem>
    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <Checkbox v-model:checked="rememberMe" size="small">
            记住密码
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <Button
            type="link"
            size="small"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            忘记密码
          </Button>
        </FormItem>
      </ACol>
    </ARow>

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
    </FormItem>

    <Row class="enter-x" :gutter="[16, 16]">
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          手机登陆
        </Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          二维码登陆
        </Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          注册
        </Button>
      </ACol>
    </Row>
  </Form>
</template>

<style lang="less" scoped></style>
