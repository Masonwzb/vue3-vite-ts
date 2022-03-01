<template>
  <input type="checkbox" id="toggle" class="offscreen" @change="inputChanged" />
  <label for="toggle" class="switch"></label>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'update', isChecked: boolean, theOther: string): void
}>()

function inputChanged(e: Event) {
  const isChecked = (e.target as HTMLInputElement).checked;
  emit('update', isChecked, 'theOtherParam')
}

</script>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  transition: all 0.3s;
  cursor: pointer;
}

.switch:after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: white;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}

input[type='checkbox']:checked + .switch:after {
  transform: translateX(20px);
}

input[type='checkbox']:checked + .switch {
  background-color: #7983ff;
}

.offscreen {
  position: absolute;
  left: -9999px;
}
</style>
