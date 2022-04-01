<script setup lang="ts">
  import { ref, onBeforeUpdate, onUpdated, computed } from 'vue'

  defineProps<{ msg: string }>()

  const count = ref(3)

  const double = computed(() => count.value * 2);
  console.log('double ? ', double);

  const list = ref([1, 2, 3])

  let itemRefs: Array<HTMLElement> = []

  const setItemRef = (el: any) => {
    if (el) {
      itemRefs.push(el);
    }
    console.log('refs --- 2', el, itemRefs);
  }

  const addCount = () => {
    count.value++
  }

  onBeforeUpdate(() => {
    itemRefs = [];
  })

  onUpdated(() => {
    console.log('v - for - refs >>> ', itemRefs);
  })
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="addCount">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>

  <div v-for="item in list" :ref="setItemRef">
    <span>the list value: {{ item }}</span>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
