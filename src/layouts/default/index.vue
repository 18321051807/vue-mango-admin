<script setup lang="ts">
defineOptions({
  name: "Layouts",
});

import { Layout } from "ant-design-vue";
import MultioleHeader from "./multipleHeader/Index";
import LayoutContent from "./content/Index";
const isHideHeader = ref(false);
</script>

<template>
  <Layout class="layout-main w-100% min-h-100% flex flex-col">
    <MultioleHeader v-if="isHideHeader"></MultioleHeader>
    <LayoutContent></LayoutContent>
  </Layout>
</template>

<style lang="less" scoped>
.layout-main {
  background-color: @content-bg;
  > .ant-layout {
    min-height: 100%;
  }
}
</style>
