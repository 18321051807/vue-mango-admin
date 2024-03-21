<!--
 * @Author: kkle
 * @Date: 2024-03-13 15:49:16
 * @LastEditors: kkle
 * @LastEditTime: 2024-03-15 11:24:39
 * @Description: 登陆表单头部
-->

<script setup lang="ts">
defineOptions({
  name: "LoginFormTitle",
});

import { LoginStateEnum, useLoginState } from "./useLoginTools";
const { getLoginState } = useLoginState();

const props = defineProps({
  w: {
    type: String,
    default: "100%",
  },
  h: {
    type: String,
    default: "80px",
  },
});

const getFormTitle = computed(() => {
  const titleObj = {
    [LoginStateEnum.RESET_PASSWORD]: "重置密码",
    [LoginStateEnum.LOGIN]: "欢迎登陆！",
    [LoginStateEnum.REGISTER]: "注册",
    [LoginStateEnum.MOBILE]: "手机登陆",
    [LoginStateEnum.QR_CODE]: "二维码登陆",
  };
  return titleObj[unref(getLoginState)];
});
</script>

<template>
  <div
    class="login-form-title font-size-28px text-center enter-x"
    :style="{ height: h, lineHeight: h }"
  >
    {{ getFormTitle }}
  </div>
</template>

<style lang="less" scoped></style>
