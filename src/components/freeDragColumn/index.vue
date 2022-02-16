<template>
  <div id="app" style="width: 100%; height: 100vh; border:1px solid #ccc;">
    <drag-box style="width: 100%; height: 100%;">
      <drag-item :resizeShow="true">item1</drag-item>
      <drag-item :resizeShow="true">item2</drag-item>
      <drag-item :resizeShow='false'>item3</drag-item>
    </drag-box>
  </div>
</template>

<script setup lang="ts">
  import DragBox from './dragBox.vue'
  import DragItem from './dragItem.vue'
</script>
