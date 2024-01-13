<template>
  <svg
    aria-hidden="true"
    :width="`${width}px`"
    :height="`${height}px`"
    :viewBox="`0 0 ${width} ${height}`">
    <use
      :href="symbolId"
      :fill="color"
      :color="color"
      :stroke="strokeColor" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  prefix?: string,
  name: string,
  color?: string
  strokeColor?: string,
  width?: number,
  height?: number,
}>(), {
  prefix: 'icon',
  color: '#333',
  strokeColor: '',
  width: 24,
  height: 24,
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);

</script>

<style scoped>

</style>
