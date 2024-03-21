<script setup lang="ts">
defineOptions({
  name: "QRCodeLogin",
});
import LoginFormTitle from "./LoginFormTitle.vue";
import { LoginStateEnum, useLoginState } from "./useLoginTools";
import { Button, Divider } from "ant-design-vue";
const { getLoginState, handleBackLogin } = useLoginState();
const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE);

const qrCodeUrl = "https://vben.vvbin.cn/login";
</script>

<template>
  <template v-if="getShow">
    <login-form-title h="150px"></login-form-title>
    <div class="enter-x min-w-64 min-h-64">
      <!-- <QrCode
        :value="qrCodeUrl"
        class="enter-x flex justify-center xl:justify-start"
        :width="280"
      /> -->
      <Divider class="enter-x">扫码后点击“确认”，即可完成登陆</Divider>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        返回
      </Button>
    </div>
  </template>
</template>

<style lang="less" scoped></style>
