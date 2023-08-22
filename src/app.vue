<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup lang="ts">
import clickEffect from "@/hooks/specialEffects.js";
import { onMounted } from "vue";
// 调用全局特效函数
onMounted(() => {
  clickEffect()
})
</script>
