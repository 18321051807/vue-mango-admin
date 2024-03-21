<script setup lang="ts">
defineOptions({
  name: "VerificationCodeInput",
});

import { Button } from "ant-design-vue";
import { useCount } from "../component/useLoginTools";
const props = defineProps({
  value: { type: String },
  size: {
    type: String,
    validator: (v: string) => ["default", "large", "small"].includes(v),
  },
  count: { type: Number, default: 60 },
  beforeStartFunc: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
});

const { currentCount, isStart, start, reset } = useCount(props.count);

const handleStart = async () => {
  const { beforeStartFunc } = props;
  if (beforeStartFunc && typeof beforeStartFunc === "function") {
    loading.value = true;
    try {
      const canStart = await beforeStartFunc();
      canStart && start();
    } finally {
      loading.value = false;
    }
  } else {
    start();
  }
};
const loading = ref(false);

const getButtonText = computed(() => {
  return !unref(isStart) ? "获取验证码" : unref(currentCount) + "秒后重新获取";
});

watchEffect(() => {
  props.value === undefined && reset();
});
</script>

<template>
  <a-input
    v-bind="$attrs"
    :size="size"
    :value="props.value"
    placeholder="短信验证码"
  >
    <template #addonAfter>
      <Button
        v-bind="$attrs"
        :disabled="isStart"
        @click="handleStart"
        :loading="loading"
      >
        {{ getButtonText }}
      </Button>
    </template>
    <template
      #[item]="data"
      v-for="item in Object.keys($slots).filter((k) => k !== 'addonAfter')"
    >
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </a-input>
</template>

<style lang="less" scoped>
:deep(.ant-input) {
  height: 40px;
}
:deep(.ant-input-group-addon) {
  padding-right: 0;
  border: none;
  background-color: transparent;
  button {
    font-size: 14px;
    height: 40px;
  }
}
</style>
