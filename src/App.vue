<script setup lang="ts">
import { ref } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import FreeDragColumn from './components/freeDragColumn/index.vue';
// import './components/switch/vueWebComponent/index.ts'
// import './components/switch/webComponent/index.ts'
// import mySwitch from './components/switch/element/components/switch.vue'
import './components/switch/element/components/index.ts'

function personaChanged(e: Event) {
  const [isChecked] = (e as CustomEvent).detail
  value1.value = isChecked
  console.log('is get ??? Event the bind for element', isChecked)
}

const value1 = ref(true)
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <persona-vue-switch :value="value1" :width="40" @change="personaChanged"></persona-vue-switch>
<!--  <my-switch v-model="value1" :width="100"></my-switch>-->
<!--  <persona-switch @update="personaChanged" customprop="vueAttribute"></persona-switch>-->
<!--  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
<!--  <FreeDragColumn></FreeDragColumn>-->
</template>

<style>
@import "./components/switch/element/components/style/base.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
