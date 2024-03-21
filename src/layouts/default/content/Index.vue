<script setup lang="ts">
defineOptions({
  name: "LayoutContent",
});
import { BackTop } from "ant-design-vue";
const isOpenBackTop = ref(true);
const openCache = ref(true);
const getCaches = computed((): string[] => {
  return [];
});
</script>

<template>
  <div ref="content" class="w-100% h-100%">
    <RouterView>
      <template #default="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
          <keep-alive v-if="openCache" :include="getCaches">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </RouterView>
    <BackTop
      v-if="isOpenBackTop"
      :target="() => content"
      :visibilityHeight="100"
    />
  </div>
</template>

<style lang="less" scoped></style>
