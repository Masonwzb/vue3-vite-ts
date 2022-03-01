<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import FreeDragColumn from './components/freeDragColumn/index.vue';
import './components/switch/vueWebComponent/index.ts'

function personaChanged(e: Event) {
  const [isChecked, theOther] = (e as CustomEvent).detail;
  console.log('is get ??? Event the bind for vue define', isChecked, theOther);
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <persona-switch @update="personaChanged"></persona-switch>
<!--  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
<!--  <FreeDragColumn></FreeDragColumn>-->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
