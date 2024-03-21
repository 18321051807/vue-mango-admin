<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";

import zhCN from "ant-design-vue/es/locale/zh_CN";
import en from "ant-design-vue/es/locale/en_US";
import dayjs from "dayjs";

const language = ref("zh-cn");
const localeHandle = computed(() => (language.value === "zh-cn" ? zhCN : en));

import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
</script>

<template>
  <ConfigProvider :locale="localeHandle" :wave="{ disabled: true }">
    <div id="container">
      <RouterView />
    </div>
  </ConfigProvider>
</template>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
