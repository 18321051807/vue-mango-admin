<!--
 * @Author: kkle
 * @Date: 2024-03-15 10:15:18
 * @LastEditors: kkle
 * @LastEditTime: 2024-03-15 15:47:40
 * @Description: 密码强度
-->

<script setup lang="ts">
defineOptions({
  name: "StrengthPassword",
});
import { Input } from "ant-design-vue";

const props = defineProps({
  value: {},
  showInput: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const innerValueRef = ref("");

const emit = defineEmits(["score-change", "change"]);

function handleChange(e) {
  emit("change", e.target.value);
  innerValueRef.value = e.target.value;
}
</script>

<template>
  <div class="strength-warp relative">
    <Input.Password
      v-if="showInput"
      v-bind="$attrs"
      allowClear
      :value="innerValueRef"
      @change="handleChange"
      placeholder="输入密码"
      :disabled="disabled"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </Input.Password>
  </div>
</template>

<style lang="less" scoped>
:deep(.ant-input) {
  height: 30px;
}
</style>
