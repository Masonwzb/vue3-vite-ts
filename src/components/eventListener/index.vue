<script setup lang="ts">
import { ref, watchEffect } from "vue"
import { useEventListener } from "./hook/use-event-listener"

const count = ref(0)

const changeCount = () => count.value++

const divRef = ref<HTMLElement | null>(null)

useEventListener(
    divRef.value,
    'click',
    () => console.log('get the value of count')
)

watchEffect((onInvalidate) => {
  const newCount = count.value + 5
  console.log('new Count - ', newCount)
  onInvalidate(() => console.log('Clean up ~'))
})
</script>

<template>
  <div ref="divRef" @click="changeCount">Count: {{ count }}</div>
</template>

<style lang="scss" scoped>

</style>
