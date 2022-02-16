<script setup lang="ts">
  withDefaults(defineProps<{
    resizeShow: boolean
  }>(), {
    resizeShow: true
  })
</script>

<template>
  <div class="drag-item-wrapper" ref="dragItemRef">
    <div class="drag-item-contain">
      <slot>默认信息</slot>
    </div>
    <!--拖拽条-->
    <div v-if="resizeShow" class="resize"></div>
  </div>
</template>

<style lang="scss" scoped>
.drag-item-wrapper {
  min-width: 200px;
  position: relative;
  .drag-item-contain {
    height: 100%;
    width: 100%;
  }
  .resize {
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    cursor: col-resize;
    background-color: #d6d6d6;
  }
}
</style>
