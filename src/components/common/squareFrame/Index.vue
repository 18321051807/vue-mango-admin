<script setup lang="ts">
import { PropType } from "vue";

defineOptions({
  name: "SquareFrame",
});

interface IOption {
  width?: string;
  height?: string;
  borderColor?: string;
}
const prop = defineProps({
  w: {
    default: "500px",
    type: String,
  },
  h: {
    type: String,
    default: "500px",
  },
  borderColor: {
    default: "red",
    type: String,
  },
});
const { w, h, borderColor } = prop;
</script>

<template>
  <div
    class="frame-warp position-relative bg-#fff"
    :style="{
      width: w,
      height: h,
    }"
  >
    <span class="frame-item-one"></span>
    <span class="frame-item-two"></span>
    <div class="frame-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.frame-warp {
  border: 1.5px solid #79bbff;
  border-radius: 3px;
  overflow: hidden;
  .frame-content {
    padding: 5px;
  }
  .frame-item-one,
  .frame-item-two {
    position: absolute;
    display: block;
    width: inherit;
    height: inherit;
    &::before,
    &::after {
      content: "";
      position: absolute;
      z-index: 1;
    }
  }
  .frame-item-one {
    &::before {
      filter: hue-rotate(0deg);
      top: 0px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, transparent, #79bbff);
      animation: loginLeft 3s linear infinite;
    }
    &::after {
      filter: hue-rotate(60deg);
      top: -100%;
      right: 2px;
      width: 3px;
      height: 100%;
      background: linear-gradient(180deg, transparent, #79bbff);
      animation: loginTop 3s linear infinite;
      animation-delay: 0.7s;
    }
  }

  .frame-item-two {
    &::before {
      filter: hue-rotate(120deg);
      bottom: 2px;
      right: -100%;
      width: 100%;
      height: 3px;
      background: linear-gradient(270deg, transparent, #79bbff);
      animation: loginRight 3s linear infinite;
      animation-delay: 1.4s;
    }
    &::after {
      filter: hue-rotate(300deg);
      bottom: -100%;
      left: 0px;
      width: 3px;
      height: 100%;
      background: linear-gradient(360deg, transparent, #79bbff);
      animation: loginBottom 3s linear infinite;
      animation-delay: 2.1s;
    }
  }
}
</style>
