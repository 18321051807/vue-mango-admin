<script setup lang="ts">
defineOptions({
  name: "SvgIcon",
});

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#fff",
  },
  w: {
    type: String,
    default: "1em",
  },
  h: {
    type: String,
    default: "1em",
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <svg
    aria-hidden="true"
    class="svg-icon sub-icon"
    :width="props.w"
    :height="props.h"
  >
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<style lang="less" scoped>
.sub-icon {
  color: currentColor;
  display: inline-block;
  margin-right: 5px;
}
</style>
