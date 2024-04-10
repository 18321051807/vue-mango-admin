<script setup lang="ts">
defineOptions({
  name: "login",
});
import SquareFrame from "@/components/common/squareFrame/Index.vue";
import LoginForm from "./component/LoginForm.vue";
import ForgotPassword from "./component/ForgotPassword.vue";
import MobilePhoneLogin from "./component/MobilePhoneLogin.vue";
import QRCodeLogin from "./component/QRCodeLogin.vue";
import RegisterInfo from "./component/RegisterInfo.vue";
const svgAsUrl = new URL("@/assets/login/login-bg.svg", import.meta.url).href;

import { getDailyEnglish } from "@/api/basic/index";

const getDaily = async () => {
  let res = await getDailyEnglish();
  console.log(res, "res");
};
onMounted(async () => {
  await getDaily();
});

const state = reactive({
  tabsActiveName: "account",
  isScan: false,
});
</script>

<template>
  <div class="login-warp flex h-100% min-w-980px min-h650px">
    <div class="left-warp flex-1 position-relative bg-#d3efff mr100px">
      <img
        :src="svgAsUrl"
        class="login-left-waves position-absolute top-0 right--100px h-100% w-100px"
      />
    </div>
    <div class="w-700px flex flex-items-center flex-justify-center login-right">
      <square-frame borderColor="'red'" h="570px">
        <div class="flex flex-col w-100% h-100%">
          <login-form></login-form>
          <forgot-password></forgot-password>
          <mobile-phone-login></mobile-phone-login>
          <q-r-code-login></q-r-code-login>
          <register-info></register-info>
        </div>
      </square-frame>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
